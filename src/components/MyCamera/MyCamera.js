import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {db, storage} from '../../firebase/config';
import { TouchableOpacity ,View, Text} from 'react-native-web';

class MyCamera extends Component{
    constructor(props){
        super(props),
        this.state = {
            permisosDeHardware: false,
            urlInternaFoto: '',
            mostrarLaCamara: true
        },
        this.metodosDeCamara = ''
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( () => {
                this.setState({
                    permisosDeHardware: true,
                })
            })
            .catch(e => console.log(e))
    }

    sacarFoto(){

    }

    guardarFoto(){
        
    }

    render(){
        return(
            <View>
                <Camera
                    //style = {}
                    type = {Camera.Constants.Type.front}
                    ref = {metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                />
                <TouchableOpacity onPress={()=> this.sacarFoto()}>
                    <Text>Sacar Foto</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default MyCamera