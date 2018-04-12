import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet
} from "react-native";

//import { Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons';

class DriverHomeTab extends Component{
	static navigationOptions = {
		tabBarIcon: ({ tintColor}) => (
			<Icon name="pizza" style={{ color: tintColor }} />
		)

	}
	render(){
		return(
			<View style = {styles.container}>
				<Text>Driver</Text>
			</View>
		);
	}
}

export default DriverHomeTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})