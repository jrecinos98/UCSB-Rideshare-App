import React, { Component } from "react";
import { Text, TextInput } from "react-native";
import { View, InputGroup, Input } from "native-base";

/**
 * A component that allows a user to input text. Up to 250 characters allowed.
 */
export default class DescriptionBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    updateText(text){
        this.setState({text});
        this.props.onTextChange(text);
    }

    render() {
        return (
            <View behavior="padding" style={styles.container} enabled>
                <View style={styles.descriptionWrapper}>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder= {this.props.description}
                        onChangeText={(text) => this.updateText(text)}
                        autoCorrect={true}
                        autoCapitalize={"sentences"}
                        underlineColorAndroid='transparent'
                        value={this.state.text}
                        maxLength = {250}
                        multiline ={true}
                    />
                </View>
          </View>
        );
    }
}

const styles = {
    container:{
        marginLeft:15,
        marginRight:10,
        marginTop:0,
        marginBottom:5,
        backgroundColor:"#fff",
        opacity:0.7,
        borderRadius:7
    },
    label:{
        fontSize:12,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0
    },
    descriptionWrapper: {
        margin: 10
    },
    descriptionInput: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 70,
        fontSize: 15,
        borderRadius: 7,
        padding: 10
    }
}
