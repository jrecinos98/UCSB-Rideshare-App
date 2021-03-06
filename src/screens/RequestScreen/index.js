import React, { Component } from "react";
import { StatusBar, View, Text, StyleSheet, ScrollView, RefreshControl, Image} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import ListView from '../../components/ListView';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Constants from '../../Constants';
import Utility from '../../Utility';
import Database from "../../Database";
import ListItem from "../../components/ListItem";

/**
 * This screen allows a user to request a ride.
 */
export default class RequestScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            color_theme: Constants.COLOR.THEME_CLASSIC,
            refreshing: false
        };
        Utility.getTheme((theme) => {
            this.setState({
                color_theme: theme
            });
        });
        this.refreshing= false;
        Database.retrieveUserRequests((list)=> {
            this.setState({data: list});
        });

    }
    componentDidMount(){
        this._onRefresh();
    }

    _onRefresh(){
        this.setState({refreshing: true});
        Database.retrieveUserRequests((list) => {
            this.setState({refreshing: false, data: list});
        })

    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor}) => (
            <Image
                source={require("../../../public/assets/guy_request.png")}
                style={{
                    tintColor: tintColor,
                    width: 26,
                    height: 26,
                    resizeMode: "contain"
                }}
            />
        )
    };

    renderItem = ({item}) => {
        return (
            <ListItem
                item={item}
                imageStyle={styles.requestStyle}
                filePath2={require("../../../public/assets/request_hand.png")}
                onPress={() => {
                   // this.props.screenProps.rootNavigation.navigate("RideViewScreen", {ride: item});
                }}/>)
    };

    render(){
        const customStyle = {
            topBar: [styles.topBar, {
                height: getStatusBarHeight() + Constants.DIMENSION.TOPBAR.HEIGHT,
                backgroundColor: this.state.color_theme.APP_BACKGROUND
            }],
            title: [styles.title, {
                fontSize: Constants.DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (Constants.DIMENSION.TOPBAR.HEIGHT - Constants.DIMENSION.TITLE.SIZE) / 2 - 3,
                color: this.state.color_theme.APP_FOCUS
            }],
        };
        let statusTheme = (this.state.color_theme === Constants.COLOR.THEME_LIGHT) ? "dark-content" : "light-content";

        return (
            <View style={styles.container}>
                <StatusBar barStyle={statusTheme}/>
                <View style={customStyle.topBar}/>
                <Text style={customStyle.title}>List of Requests</Text>
                <ScrollView

                    style={styles.historyContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}/>
                    }>
                    <ListView
                        title={"Requested Rides"}
                        style={styles.rideHistStyle}
                        renderItem={this.renderItem}
                        data={this.state.data}
                        refreshing={this.refreshing}
                        onRefresh={() => {
                            Database.retrieveUserRequests((list) => {
                                if (this.state.data.length !== list.length)
                                    this.setState({data: list})
                            })
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}
//var width=Constants.DIMENSIONs.get("window").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    requestStyle: {
        width: 65,
        height: 65,
        resizeMode: "contain",
        //tintColor: "green"
    },
    topBar: {
        backgroundColor: null,
        alignSelf: 'stretch',
        height: null
    },
    rideHistStyle: {
        flex: 1,
        aspectRatio: 0.5,
        resizeMode: 'contain'
    },
    title: {
        color: null,
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        fontSize: null,
        paddingTop: null
    },
    historyContainer: {
        marginTop: null,
        flex: 1
    }
});