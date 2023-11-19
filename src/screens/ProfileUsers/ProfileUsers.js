import react, { Component } from "react";
import { auth, db } from "../../firebase/config";
import {TextInput,TouchableOpacity,View,Text,StyleSheet,FlatList,Image} from "react-native";
import Post from '../../components/Post/Post';

class ProfileUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            listaDePosteos: []
        };
    }

    componentDidMount() {
        db.collection('users').where("owner", "==", this.props.route.params).onSnapshot(
            docs => {
                let usuario = [];
                docs.forEach(doc => {
                    usuario.push({
                        id: doc.id,
                        datos: doc.data()
                    })
                })
                this.setState({ usuarios: usuario })

            })

        db.collection("posts").where("owner", "==", this.props.route.params).orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        datos: doc.data()
                    })
                })
                this.setState({ listaDePosteos: posteos })
            }
        )

    }

    render() {
        console.log(this.state.listaDePosteos)
        return (
            <View style={styles.container}>
                <View style={styles.flexUno}>
                <FlatList
                    data={this.state.usuarios}
                    keyExtractor={unUsuario => unUsuario.id}
                    renderItem={({ item }) =>
                        <View>
                            <Text style={styles.textoBlanco}>Email:{item.datos.owner}</Text>
                            <Text style={styles.textoBlanco}>Nombre de usuario: {item.datos.userName} </Text>
                            <Image
                                style={styles.fotoPerfil}
                                source={{
                                    uri: item.datos.fotoPerfil
                                }} />
                        </View>
                    }
                    
                />
                </View >
                {
                    this.state.listaDePosteos.length ==0 ?
                    <Text style={styles.textoBlanco}> Este usuario no tiene nigun posteo</Text> :
                    <View style={styles.flexDos}> 
                        <FlatList
                            data={this.state.listaDePosteos}
                            keyExtractor={unPost => unPost.id}
                            renderItem={({ item }) =>
                            <Post dataPost={item} navigation={this.props.navigation} />}
                            /></View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding : 5,
        backgroundColor: 'grey',
        color : 'white',
      },
      textoBlanco: {
        color: 'white',
      },
      flexUno: {
        flex : 1,
        justifyContent: 'space-evenly'
      },
      flexDos: {
        flex : 2
      },
      fotoPerfil :{
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 10,
    },
  
      loader: {
        display : 'flex',
        flex : 1,
        justifyContent : 'center',
        marginTop : 300
      },
      image: {
        height: 50,
     }
    })

export default ProfileUsers