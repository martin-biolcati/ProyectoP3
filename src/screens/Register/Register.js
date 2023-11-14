import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            error:'',
            email:'',
            userName:'',
            password:'',
            registered:'',
            loggedIn: false
        }
    }

    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                this.props.navigation.navigate('Home')
            }

        } )

    }

    register (email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then(()=>{
                this.setState({registered: true});
                console.log('Registrado ok');
            })
            .catch( error => {
                this.setState({error: 'Fallo en el registro.'})
                console.log(error);
            })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='User name'
                    keyboardType='default'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ bio: text })}
                        placeholder="Mini biografía"
                        keyboardType="default"
                        value={this.state.bio}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ fotoPerfil: text })}
                        placeholder="URL para foto de perfil"
                        keyboardType="default"
                        value={this.state.fotoPerfil}
                    />
                  
                    {!this.state.userName || !this.state.email || !this.state.password ? (
                        <TouchableOpacity style={styles.botonDeshabilitado} onPress={() => alert("Debe completar: Email, User name y Password")}>
                            <Text style={styles.textButton}>Registrarse</Text>
                        </TouchableOpacity>
                    ) :(
                    <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password)}>
                        <Text style={styles.textButton}>Registrarse</Text>    
                    </TouchableOpacity> 
                    )}

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text>Ya tengo cuenta. Ir al login</Text>
                </TouchableOpacity>
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
        alignItems: 'center', 
        padding: 15,
        borderRadius: 5,
    },
    botonDeshabilitado: {
        backgroundColor: '#7f848e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    textButton:{
        color: 'white',
        fontSize: 16,
    }

})


export default Register;