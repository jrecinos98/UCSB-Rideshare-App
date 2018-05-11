import React, {Component} from "react";
import {Text, View, StyleSheet, Image, FlatList,SectionList,TouchableOpacity, ActivityIndicator} from "react-native";
import {List, ListItem} from "react-native-elements";
import styles from "./RideHistoryStyles.js";
import User from "../../actors/User.js";
import Ride from "../../actors/Ride.js";
import { Ionicons } from '@expo/vector-icons';
import Database from '../../Database';


export default class RideHistory extends Component {
    constructor(props){
      super(props);
      this.state = {
        loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
      };

      Database.getUserHistory((list) => {
         console.log(list.length);
         this.setState({data: list});
      });
    }

    componentDidMount(){
      // this.makeRemoteRequest();
    }

    
    errData(err){
      console.log('Error!');
      console.log(err);
    }
    /*
    riderOrDriverImage(){
      if(this.gotData()=="driver"){
        
      }
      else{

      }
    }
    */


    renderItem = ({ item }) => {
      console.log(item);
      return(
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3}}>
            {/*<Image style={{ width: 80, height: 80, margin: 5 }}
            source = {{ uri: item.image }} />*/}
          <Ionicons name="ios-car" size={65}/>
          <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>
            <Text style={{fontSize: 18, color: 'grey', marginBottom: 10}}>
              Destination:   {item.destination.name}
            </Text>
            <Text style={{fontSize: 16, color: 'red', marginBottom: 10}}>
              From:     {item.origin.name}
            </Text>

            <Text style={{fontSize: 16, color: 'grey'}}>
              Date:       

            </Text>
          </View>
        </View>
      )
    }

    renderSeparator = () => {
      return(
        <View
          style={{ height: 1, width: '100%', backgroundColor: 'black'}}>
        </View>
      )


    }
  


    makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
    };

    render() {
        return (
          		<View style={styles.container}>

          				<Text style={styles.title}>Drive History</Text>
                  <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                  />

              </View>


        );
    }
}

/*
                <View style={styles.rightContainer}>
                  <TouchableOpacity style={styles.button} onPress={()=>{alert("This should go to ride page")}}>
                    <Image source={require("../../../public/assets/plus_button.png")}
                      style={{width: 75, height: 75}}
                    />

                  </TouchableOpacity>
                  <Text>Create Ride</Text>
                
                </View>}

*/

