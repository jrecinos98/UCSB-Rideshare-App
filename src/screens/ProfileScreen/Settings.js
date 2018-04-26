import React, { Component } from "react";
import{ View, StyleSheet, Platform, Text, TouchableOpacity, ScrollView, Dimensions, Modal, AsyncStorage } from "react-native";
import * as firebase from 'firebase';
import { COLOR, STRING } from '../../Constants';
import { StackNavigator, NavigationActions } from 'react-navigation';
import User from "../../../src/actors/User";
import LoginButton from "../../components/LoginButton";
import CenterText from "../../components/CenterText";
import { Ionicons } from '@expo/vector-icons';
import { MainScreenInstance } from "../MainScreen";
import { getTheme } from '../../Utility';


export default class Settings extends Component{

	static settings_this = null;

	constructor(props) {
		super(props);
		settings_this = this;

		settings_this.state = {
			tabIndex: 0,
			visible: false,
			color_theme: COLOR.THEME_LIGHT
		};

		getTheme(function(theme) {
			settings_this.setState({
				color_theme: theme
			});
		});
	}

	setModalVisible(visible) {
		this.setState({
			visible: visible
		});
	}

	render(){

		const customStyle = {

			themeTab: [styles.themeTab, {
				backgroundColor: settings_this.state.color_theme.BUTTON,
				shadowColor: settings_this.state.color_theme.APP_FOCUS
			}],

			buttonClose: [styles.buttonClose, {
				color: settings_this.state.color_theme.APP_FOCUS
			}],

			titleText: [styles.titleText, {
				color: settings_this.state.color_theme.APP_FOCUS
			}],

			divider: [styles.divider, {
				borderBottomColor: settings_this.state.color_theme.BUTTON
			}]

		};

		return(

			<Modal
				visible={settings_this.state.visible}
				transparent={false}
				animationInTiming={300}
				animationIn={'slideInUp'}
				animationOut={'slideOutDown'}
				onRequestClose={() => {
					alert('exit setting');
				}}>

				<ScrollView
					style={{
						padding: 20,
						backgroundColor: (settings_this.state.color_theme)? settings_this.state.color_theme.APP_BACKGROUND: null
					}}>


					<View style={styles.titleBar}>
						<Ionicons
							name="ios-close"
							style={customStyle.buttonClose}
							onPress={() => {
								settings_this.setModalVisible(false);
							}}/>

						<CenterText style={customStyle.titleText}> Settings </CenterText>
					</View>


					<CenterText style={customStyle.titleText}> App Themes: </CenterText>
					<View style={styles.themeBox}>

						<TouchableOpacity
							style={customStyle.themeTab}
							onPress={() => {
								AsyncStorage.setItem(STRING.THEME.KEY, STRING.THEME.DARK);
								MainScreenInstance.updateTheme();
							}}>
							<Text style={styles.buttonText}> Dark </Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={customStyle.themeTab}
							onPress={() => {
								AsyncStorage.setItem(STRING.THEME.KEY, STRING.THEME.LIGHT);
								MainScreenInstance.updateTheme();
							}}>
							<Text style={styles.buttonText}> Light </Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={customStyle.themeTab}
							onPress={() => {
								AsyncStorage.setItem(STRING.THEME.KEY, STRING.THEME.CLASSIC);
								MainScreenInstance.updateTheme();
							}}>
							<Text style={styles.buttonText}> Classic </Text>
						</TouchableOpacity>

					</View>


					<View style={customStyle.divider}/>
					<CenterText style={customStyle.titleText}> Map Themes: </CenterText>
					<View style={styles.themeBox}>

						<TouchableOpacity style={customStyle.themeTab}>
							<Text style={styles.buttonText}> Dark </Text>
						</TouchableOpacity>

						<TouchableOpacity style={customStyle.themeTab}>
							<Text style={styles.buttonText}> Light </Text>
						</TouchableOpacity>

						<TouchableOpacity style={customStyle.themeTab}>
							<Text style={styles.buttonText}> Classic </Text>
						</TouchableOpacity>

					</View>


					<View style={customStyle.divider}/>
					<CenterText style={customStyle.titleText}> App Exit: </CenterText>
					<LoginButton
						title="Logout"
						callback={async () => {
							await firebase.auth().signOut();
							settings_this.props.navigation.dispatch(wipeLogout);
						}}/>


				</ScrollView>
			</Modal>
		);
	}

}


const wipeLogout ={
	type: 'Navigation/NAVIGATE',
	routeName: 'LoggedInStack',
	actions: {
		type: 'Navigation/NAVIGATE',
	}
};


const styles = StyleSheet.create({
	buttonText: {
		textAlign: 'center',
		color: "#FFFFFF",
		fontWeight: "700",
		textShadowColor:'rgba(0, 0, 0, 0.7)',
		textShadowOffset: {width: -1, height: 1},
		textShadowRadius: 10,
	},
	themeBox: {
		flexDirection: 'row',
		marginLeft: Dimensions.get('window').width / 16,
		marginRight: Dimensions.get('window').width / 16,
		marginTop: 10,
		marginBottom: 10,
		//outline: 1,
		zIndex: 5
	},
	themeTab: {
		width: Dimensions.get('window').width / 4,
		height: 50,
		backgroundColor: null,
		borderRadius: 5,
		shadowColor: null,
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 10,
		shadowOpacity: 0.25,
		flex: 1,
		justifyContent: 'center',
		marginLeft: 5,
		marginRight: 5
	},
	buttonClose: {
		color: null,
		fontSize: 50,
		width: 100
	},
	titleBar: {
		flexDirection: 'row'
	},
	titleText: {
		fontSize: 20,
		color: null
	},
	divider: {
	    borderBottomColor: null,
	    borderBottomWidth: 1,
	    marginLeft: Dimensions.get('window').width / 16,
	    marginRight: Dimensions.get('window').width / 16,
	    marginTop: 20,
	    marginBottom: 20
	}
});
