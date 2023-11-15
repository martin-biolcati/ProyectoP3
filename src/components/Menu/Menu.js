import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";


import Home from "../../screens/Home/Home";
import PostForm from "../../screens/PostForm/PostForm";
import Profile from "../../screens/Profile/Profile";
import Buscador from "../Buscador/Buscador"
import { Entypo } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

class Navbar extends Component {
    constructor() {
      super();
      this.state = {
        valor : ''
      };
    }
  
    render() {
  
      return (
          <Tab.Navigator>
              <Tab.Screen name="MAGOBA" component={Home} options={{tabBarIcon: () => <Entypo name='home' size={24} color='black'/>}}/>
              <Tab.Screen name="PostForm" component={PostForm} options={{tabBarIcon: () => <Octicons name='diff-added' size={24} color='black'/>}}/>
              <Tab.Screen name="Search" component={Buscador} options={{tabBarIcon: () => <FontAwesome name='search' size={24} color='black'/>}}/>
              <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <Ionicons name='person' size={24} color='black'/>}}/>
              </Tab.Navigator>
      );
    }
  }
  const styles = StyleSheet.create({
    titulo:{
        color: 'red',
        textAlign: 'center',
      alignContent: "center"
  }})
  
  export default Navbar;