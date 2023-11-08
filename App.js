import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer style={styles.container}>
    <Stack.Navigator>
      <Stack.Screen name='Registro' component={Register} options={ { headerShown: false } }/>
      <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
      <Stack.Screen name='Home' component={Home} options={ { headerShown: false } }/>
      {/* Si implementamos tabnavigation para el resto de la app. El tercer componente debe ser una navegación que tenga a Home como primer screen */}
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
