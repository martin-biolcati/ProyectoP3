import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicatior} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            logueado: false,
            error:''
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Menu')
            }
            else{
                <ActivityIndicatior size="large" color="purple"/>
            }
        
        })
    }
    login (email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( response => {
                console.log('Login ok', response);
                this.props.navigation.navigate('Menu')
            })
            .catch( error => {
                let mensajeError =  'Fallo en el registro.'
                if (error.code == 'auth/internal-error') {
                    mensajeError = 'Los datos ingresados no coinciden con un usuario registrado'
                  }
                  else {
                    mensajeError = 'Verifica tu mail'
                }
                this.setState({ error: mensajeError });
                console.log(error);
            })
    
            
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                {this.state.error ? (
                        <Text style={styles.error}>{this.state.error}</Text>
                    ) : null}
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                   <Text>No tengo cuenta. Registrarme.</Text>
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
        backgroundColor:'blue',
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
    },
    error:{
        color: 'red',
        fontSize: 16,
        textAlign: 'center'
    }

})


export default Login;