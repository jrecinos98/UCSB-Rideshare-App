import React, { Component } from "react";
import{ View, Test, StyleSheet, Platform } from "react-native";
import { TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import DriverMain from './DriverScreen/Main'
import RiderMain from './RiderScreen/Main'
import ProfileMain from './ProfileScreen/Main'

class MainScreen extends Component{
	static navigationOptions = {
		headerLeft: <Ionicons name="ios-map" style={{paddingLeft:10}} />,
		title: "GauchoRides",
		backgroundColor: '#4db6ac',
		headerRight: <Ionicons style = {{ paddingRight: 10 }}
		name="ios-send-outline" />
	}
	render(){
		return(
			<AppTabNavigator />
			);

	}
}

export default MainScreen;

const AppTabNavigator = TabNavigator(
	{
		Driver: {
			screen: DriverMain
		},
		Rider: {
			screen: RiderMain
		},
		Profile:{
			screen: ProfileMain
		}
	},
	{
		animationEnabled:true,
		swipeEnabled:true,
		tabBarPosition:"bottom",
		tabBarOptions:{
			style:{
				...Platform.select({
					android:{
						backgroundColor:'#4db6ac'
					}
				})
			},
			activeTintColor:'#212121',
			inactiveTintColor:'#d1cece',
			showIcon:true,
			showLabel:true //set to false if don't want name
		}
	}
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
