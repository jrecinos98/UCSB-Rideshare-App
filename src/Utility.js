import {AsyncStorage} from "react-native";
import Constants from './Constants';
import {GOOG_APIKEY} from './Constants'
import {TRANSPORT_MODE} from './Constants'
import User from "./actors/User";
import Ride from "./actors/Ride";
import Area from "./actors/Area";
import Database from "./Database";

/**
 * Wrapper class for all the utility functions we use.
 */
export default class Utility {

    /**
     * Retrieves the previously selected theme from local storage.
     * @param callback
     */
    static getTheme(callback) {

        try {
            AsyncStorage.getItem(Constants.STRING.KEY.APP_THEME).then((APP_THEME) => {

                if (APP_THEME === Constants.STRING.THEME.DARK)
                    callback(Constants.COLOR.THEME_DARK);

                else if (APP_THEME === Constants.STRING.THEME.LIGHT)
                    callback(Constants.COLOR.THEME_LIGHT);

                else
                    callback(Constants.COLOR.THEME_CLASSIC);
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Retrieves the previously selected map theme from local storage
     * @param callback
     */
    static getMapTheme(callback) {

        try {
            AsyncStorage.getItem(Constants.STRING.KEY.MAP_THEME).then((MAP_THEME) => {
                callback(MAP_THEME);
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Extracts a city from the given array
     * @param searchArray: array containing the address infor split by city, state, country, etc...
     * @returns a string containing only the city and state.
     */
    static extractCity(searchArray) {
        var text = "";
        if (searchArray === undefined || searchArray.length < 3) {
            return text
        }
        //If no ZIP code was input
        if (isNaN(searchArray[searchArray.length - 2].value)) {

            text = searchArray[searchArray.length - 3].value + ", " + searchArray[searchArray.length - 2].value
        }
        //If the array contains a zip code.
        else {

            text = searchArray[searchArray.length - 4].value + ", " + searchArray[searchArray.length - 3].value
        }
        return text;
    }

    /**
     *
     * @param path: Path on firebase to store the ride.
     * @param searchInputs: Array containing the address info.
     * @param chosenDate: The date that the user specified.
     * @param chosenSeats: The number of seats available in a ride.
     * @param description:
     * @param price
     * @param callback
     */
    static createRide(path, searchInputs, chosenDate, chosenSeats, description, price, callback) {
        if (searchInputs === undefined || searchInputs.pickupInput === "" || searchInputs.dropoffInput === "" || chosenDate === "") {
            callback(false);
            return;
        }
        if (searchInputs.pickupArray.length < 3) {
            window.alert("Please be more specific on your starting location.");
            callback(false);
            return;
        }
        if (searchInputs.dropoffArray.length < 3) {
            window.alert("Please be more specific on your destination.");
            callback(false);
            return;
        }
        if (isNaN(price)) {
            window.alert("please enter a valid price");
            callback(false);
            return;
        }
        let driver = User.currentUser.id;
        if (path === Constants.FIREBASE.REQUESTS_PATH) {
            driver = "N/A";
        }
        let ride = new Ride({
            id: 0,
            price: price,
            description: description,
            seats: chosenSeats,
            driver: driver,
            passengers: [],
            time: Math.floor(chosenDate / 1000),
            origin: new Area({
                latitude: searchInputs.pickupCoords.lat,
                longitude: searchInputs.pickupCoords.lng,
                radius: 5,
                name: searchInputs.pickupInput
            }),
            destination: new Area({
                latitude: searchInputs.dropoffCoords.lat,
                longitude: searchInputs.dropoffCoords.lng,
                radius: 5,
                name: searchInputs.dropoffInput
            })
        });
        let pickupCity = this.extractCity(searchInputs.pickupArray);
        let dropoffCity = this.extractCity(searchInputs.dropoffArray);
        Database.createRide(path, ride, pickupCity, dropoffCity);
        callback(true);
    }

    static createRoute(origin, destin, callback) {
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destin}&key=${GOOG_APIKEY}&mode=${TRANSPORT_MODE}`)
            .then(response => response.json())
            .then(async responseJson => {
                let coords = this.decode(responseJson.routes[0].overview_polyline.points);
                callback(coords);
            })
            .catch(e => {
                console.warn(e)
            });
    }

    //Transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
    static decode(t, e) {
        for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
            a = null, h = 0, i = 0;
            do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
            n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
            do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
            o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c])
        }
        return d = d.map(function (t) {
            return {latitude: t[0], longitude: t[1]}
        })
    }

    static formatDate(date) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let day = date.getDate();
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();

        let prefixH = "";
        let prefixM = "";
        let ampm = "AM";

        if (hour > 12) {
            hour -= 12;
            ampm = "PM";
        }

        if (hour == 0) {
            hour = 12;
            ampm = "AM";
        }

        if (hour < 10)
            prefixH = "0";

        if (minute < 10)
            prefixM = "0";

        return month + ' ' + day + ', ' + prefixH + hour + ':' + prefixM + minute + ' ' + ampm;
    }

}