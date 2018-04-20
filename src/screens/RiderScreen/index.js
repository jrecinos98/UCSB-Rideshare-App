import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapArea from './MapArea';
import SearchArea from './SearchArea';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { COLOR_APP_BACKGROUND, COLOR_APP_FOCUS, COLOR_APP_UNFOCUS, COLOR_APP_TITLE } from '../../Constants';

class RiderMain extends Component {

	static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ({ tintColor}) => (
				<Ionicons name="md-body" style={{ color: tintColor, fontSize: 20 }} />
			),
            headerLeft: <Ionicons name="ios-refresh" style={{paddingLeft:10, fontSize: 20, color: COLOR_APP_UNFOCUS}} />,
            title: 'Gaucho Rides',
            headerStyle: {
             backgroundColor: COLOR_APP_BACKGROUND
            },
            headerTitleStyle: {
             color: COLOR_APP_TITLE,
             textAlign: 'center',
             alignSelf: 'center',
             flex: 1,
             fontWeight: 'normal'
            },
            headerRight: 
                <Ionicons
                    name='ios-settings'
                    style={{ paddingRight: 10, fontSize: 20,color: COLOR_APP_UNFOCUS }}
                    onPress={() => {
                        navigation.navigate('Settings', {name: "Settings"});
                    }}/>
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <MapArea/>
                <SearchArea/>
            </View>
        );
    }
}

export default RiderScreen = StackNavigator({
    RiderMain: {screen: RiderMain}
});

//var width = Dimensions.get("window").width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: 'center',
		justifyContent: 'center'

        
	}
});