import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";


import Home from "../../screens/Home/Home";
import PostForm from "../../screens/PostForm/PostForm";
import Profile from "../../screens/Profile/Profile";

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
              <Tab.Screen name="Home" component={Home}/>
              <Tab.Screen name="PostForm" component={PostForm}/>
              <Tab.Screen name="Profile" component={Profile}/>
          </Tab.Navigator>
      );
    }
  }
  
  export default Navbar;