import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home'
import Profile from './src/screens/Profile/Profile';
import PostForm from './src/screens/PostForm/PostForm';
import Menu from './src/components/Menu/Menu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileUsers from './src/screens/ProfileUsers/ProfileUsers';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer style={styles.container}>
    <Stack.Navigator>
      <Stack.Screen name='Register' component={ Register } options={{headerShown : false}}  />
      <Stack.Screen name='Login'component={ Login } options={{headerShown : false}} />
      <Stack.Screen name='Menu'component={ Menu } options={{headerShown : false}} />
      <Stack.Screen name='ProfileUsers'component={ ProfileUsers } options={{headerShown : true}} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
