import React, { Component } from "react";
import {  View, StyleSheet } from "react-native";
import WheelComponent from './WheelComponent'
import Constants from "../../Constants";
import Utility from "../../Utility";
import User from '../../actors/User';

/**
 * Container class for all the WheelComponent objects. The object retrieves the user rating and displays the components it holds accordingly.
 */
export default class WheelRating extends Component{
    constructor(props) {
        super(props);
        wheel_this=this;
        wheel_this.state = {
            color_theme: Constants.COLOR.THEME_LIGHT
        };
        //this.getRating= this.getRating.bind(this);
        Utility.getTheme(function (theme) {
            wheel_this.setState({
                color_theme: theme
            });
        });


    }

    render(){
        let rating = User.currentUser.drive_rating;
        let wheel = [0, 0, 0, 0, 0];
        for (let i = 0; rating > 0 && i < 5; i++) {

            if (rating <= 1) {
                wheel[i] = 40 * rating;
                rating = 0;
            }
            else {
                wheel[i] = 40;
                rating = rating - 1;
            }
        }

        const dynamicStyle = {
            wheelImage: [styles.wheelImage, {
                tintColor: wheel_this.state.color_theme.APP_BACKGROUND_PROFILE
            }],
            backgroundRight: [styles.backgroundRight,{
                backgroundColor: Constants.RATING_COLOR.UNSELECTED
            }],
            backgroundLeft: [styles.backgroundLeft,{
                backgroundColor: Constants.RATING_COLOR.WHEEL_COLOR

            }]
        };

        return (
        <View style={styles.wheelContainer}>
            <WheelComponent  backgroundLeft={[dynamicStyle.backgroundLeft, {width: wheel[0]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - wheel[0]}]} imageStyle={[dynamicStyle.wheelImage,{marginLeft: 0}]}/>
            <WheelComponent  backgroundLeft={[dynamicStyle.backgroundLeft, {width: wheel[1]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - wheel[1]}]} imageStyle={dynamicStyle.wheelImage}/>
            <WheelComponent  backgroundLeft={[dynamicStyle.backgroundLeft, {width: wheel[2]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - wheel[2]}]} imageStyle={dynamicStyle.wheelImage}/>
            <WheelComponent  backgroundLeft={[dynamicStyle.backgroundLeft, {width: wheel[3]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - wheel[3]}]} imageStyle={dynamicStyle.wheelImage}/>
            <WheelComponent  backgroundLeft={[dynamicStyle.backgroundLeft, {width: wheel[4]}]} backgroundRight={[dynamicStyle.backgroundRight, {width: 40 - wheel[4]}]} imageStyle={[dynamicStyle.wheelImage,{marginRight: 0}]}/>
        </View>
        )
    }
}

const styles= StyleSheet.create({
    wheelContainer: {
        //flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10


    },
    wheelImage: {
        width: 40,
        height: 40,

    },
    backgroundLeft: {
        width: 40,
        height: 40,
       // backgroundColor: "black"
        // borderRadius: 20
    },
    backgroundRight: {
        width: 0,
        height: 40,
       // backgroundColor: 'gray',

        //Border radius only works correctly when only one (right or left) cover the entire background (one is width 40 the other is 0)
        // borderRadius: 20

    }

});