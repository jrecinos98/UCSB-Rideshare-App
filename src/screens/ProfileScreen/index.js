import React, { Component } from "react";
import { StatusBar, LayoutAnimation, UIManager, View, Image, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import {Body, Container, Header, Title} from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Settings from './Settings';
import { COLOR, DIMENSION } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';

import User from "../../../src/actors/User";
import { getTheme } from '../../Utility';

import WheelRating from '../../components/WheelRating'
import SexyRating from '../../components/SexyRating'
import {GestureHandler} from 'expo'
import {BounceProfileImage} from "../../components/BounceProfileImage";


export default class ProfileScreen extends Component {

    static profile_this = null;

    constructor(props) {
        super(props);
        profile_this = this;
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        profile_this.state = {
            color_theme: COLOR.THEME_LIGHT
        };

        getTheme(function (theme) {
            profile_this.setState({
                color_theme: theme
            });
        });
    }


    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Ionicons name="ios-contact" style={{color: tintColor, fontSize: 20}}/>
        )
    };

    render() {

        const customStyle = {
            topBar: [styles.topBar, {
                height: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT,
                backgroundColor: profile_this.state.color_theme.APP_BACKGROUND,
                borderBottomColor: profile_this.state.color_theme.APP_FOCUS
            }],
            settings: [styles.settings, {
                fontSize: DIMENSION.ICON.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.ICON.SIZE) / 2,
                color: profile_this.state.color_theme.APP_FOCUS
            }],
            title: [styles.title, {
                fontSize: DIMENSION.TITLE.SIZE,
                paddingTop: getStatusBarHeight() + (DIMENSION.TOPBAR.HEIGHT - DIMENSION.TITLE.SIZE) / 2 - 3,
                color: profile_this.state.color_theme.APP_FOCUS
            }],
            userName: [styles.userName, {
                color: profile_this.state.color_theme.FB_NAME_COLOR
            }],
            textStyle: [styles.textStyle,{
                color: profile_this.state.color_theme.FB_NAME_COLOR
            }],
            container: [styles.container, {
                backgroundColor: profile_this.state.color_theme.APP_BACKGROUND_OPQUE
            }],
            imageWrapper: [styles.imageWrapper, {
                marginTop: getStatusBarHeight() + DIMENSION.TOPBAR.HEIGHT
            }]
        };

        let statusTheme = (profile_this.state.color_theme == COLOR.THEME_LIGHT) ? "dark-content": "light-content";

        return (

            <View style={styles.container}>
                <Settings ref={(instance) => {
                    settings = instance;
                }}/>

                <StatusBar barStyle={statusTheme}/>
                <View style={customStyle.topBar}>
                    <Ionicons
                        name='ios-settings'
                        style={customStyle.settings}
                        onPress={() => {
                            settings.setModalVisible(true);
                        }}/>
                    <Text style={customStyle.title}>Profile</Text>
                </View>

                <View style={customStyle.container}>
                    <View style={styles.imageWrapper}>
                        <Text style={customStyle.userName}>{User.currentUser.name}</Text>
                        <BounceProfileImage source={{uri: 'https://graph.facebook.com/' + User.currentUser.fbID + '/picture?type=large'}} borderRadius={72}/>
                    </View>

                    <View style={styles.ratingContainer}>
                        <Text style={customStyle.textStyle}>RATINGS</Text>
                        <WheelRating/>
                        <SexyRating/>
                    </View>
                    <View>


                        {/*Todo*/}

                    </View>


                </View>
            </View>

        );

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: null,
        flex: 1,

    },
    ratingContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

       // justifyContent: 'center'
    },
    imageWrapper: {
        marginTop: null,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 6,

    },
    userName: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        fontSize: 25,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 6,
    },
    topBar: {
        backgroundColor: null,
        alignSelf: 'stretch',
        height: null
        // borderBottomWidth: 0.5
    },
    settings: {
        paddingRight: 25,
        paddingTop: null,
        fontSize: null,
        color: null,
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    title: {
        color: null,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: null,
        paddingTop: null
    }
});
