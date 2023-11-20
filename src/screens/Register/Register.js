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
            bio:'',
            fotoPerfil:'',
            loggedIn: false
        }
    }

    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Menu')
            }
            else{
                <ActivityIndicatior size="large" color="purple"/>
            }
        
        })

    }

    register (email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then(()=>{
                this.setState({loggedIn: true});
                console.log('Registrado ok');
            })
            .then(res => {
                let dataUsuario = {
                    owner: this.state.email,
                    userName: this.state.userName,
                    email: this.state.email,
                    createdAt: Date.now(),
                    bio: this.state.bio,
                    fotoPerfil: this.state.fotoPerfil
                };
                db.collection('users').add(dataUsuario)
                    .then(() => {
                        this.setState({
                            email: "",
                            userName: "",
                            password: "",
                            bio: "",
                            fotoPerfil: "",
                            error: null
                        })
                        auth.signOut();
                    })
                    .then(() => {
                        this.props.navigation.navigate('Login');
                    })
            })
            .catch( error => {
                let mensajeError =  'Fallo en el registro.'
                if (error.code === "auth/email-already-in-use") {
                    mensajeError = "El correo electrónico ya está en uso";
                } else if (error.code === "auth/invalid-email") {
                    mensajeError = "El correo electrónico no es válido";
                } else if (error.code === "auth/weak-password") {
                    mensajeError = "La contraseña es demasiado débil";
                } 
                this.setState({ error: mensajeError });
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
                    
                    {this.state.error ? (
                        <Text style={styles.error}>{this.state.error}</Text>
                    ) : null}

                    {!this.state.userName || !this.state.email || !this.state.password ? (
                        <TouchableOpacity style={styles.botonDeshabilitado} onPress={() => alert("Debe completar: Email, User name y Password")}>
                            <Text style={styles.textButton}>Registrarse</Text>
                        </TouchableOpacity>
                    ) :(
                    <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName, this.state.bio, this.state.fotoPerfil)}>
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
        paddingHorizontal:5,
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
    },
    error:{
        color: 'red',
        fontSize: 16,
        textAlign: 'center'
    }

})


export default Register;