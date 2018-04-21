import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './src/screens/MainScreen'
import NewUserScreen from './src/screens/NewUserScreen'
import { YellowBox } from 'react-native';
import * as fireBase from 'firebase';

//Ignore those annoying deprecated warnings.
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);

export default class App extends React.Component {
    render() {
        return(<SignedOutStackNavigator/>);
    }
}

const SignedOutStackNavigator = StackNavigator({
    Login: {screen: NewUserScreen},
    Main: {screen: MainScreen},
}, {
    initialRouteName: "Login",
});
