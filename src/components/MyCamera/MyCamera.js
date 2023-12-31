import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {db, storage} from '../../firebase/config';
import { TouchableOpacity ,View, Text, StyleSheet, Image} from 'react-native-web';

class MyCamera extends Component{
    constructor(props){
        super(props),
        this.state = { 
            permisosDeHardware: false,
            urlInternaFoto: '', 
            mostrarLaCamara: true}
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(res => {
            if (res.granted === true) {
                this.setState({
                    permisosDeHardware: true
                })
            }
        })
        .catch(e => console.log(e))
    }

    sacarFoto(){
        this.metodosCamara.takePictureAsync()
        .then( urlInternaFoto => {
            this.setState({
                urlInternaFoto: urlInternaFoto.uri,
                mostrarLaCamara: false
            })
        })
        .catch(e => console.log(e))
    }

    rechazarFoto(){
        this.setState({
            mostrarLaCamara: true,
        })
    }

    aceptarFoto(){
        fetch(this.state.urlInternaFoto)
        .then(res => res.blob())
        .then(image => {
           const ref = storage.ref(`urlInternaFoto/${Date.now()}.jpg`)
           ref.put(image)
           .then( () => {
            ref.getDownloadURL()
            .then( url => {
                this.props.onImageUpload(url)
            }
            )
        })
        })
        .catch(e => console.log(e))
    }

    render(){
        return (
            <>
                {this.state.permisosDeHardware ? 
                this.state.mostrarLaCamara ?
                <View style={styles.formContainer} >
                    <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={metodosCamara => this.metodosCamara = metodosCamara}/>
                    <TouchableOpacity style={styles.button} onPress={() => this.sacarFoto()}>
                        <Text style={styles.textButton}>Sacar foto</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.formContainer}>
                    <Image style={styles.camera} source={{uri: this.state.urlInternaFoto}} />
                    <TouchableOpacity style={styles.button} onPress={() => this.aceptarFoto()}>
                        <Text style={styles.textButton}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.rechazarFoto()}>
                        <Text style={styles.textButton}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
                :
                <Text style={styles.texto}>No tenes permisos de la camara</Text>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        widht: `100vw`,
    },
    camera: {
        widht: '100%',
        height: '100%',
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10,
    },
    button: {
      backgroundColor: "blue",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745",
    },
    textButton: {
      color: "#fff",
    },
    texto:{
         color: 'white',
     }
  });


export default MyCamera