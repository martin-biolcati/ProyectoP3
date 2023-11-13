import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Profile extends Component {
    constructor(){
        super()
        this.state={
        }
    }

    componentDidMount(){
         }
         
    logout(){
            auth.signOut();
            this.props.navigation.navigate('Login')
        }

    render(){
        return(
            <View style={styles.formContainer}>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home')}>
                <Text>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                
                <Text>{auth.currentUser.email}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:600,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})


export default Profile;