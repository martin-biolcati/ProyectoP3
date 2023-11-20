import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput,FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'; 


class Post extends Component {

    constructor(props){
        super(props);

        this.state = {
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length,
            comentarioTexto: "",
            comentarios: [],
            mostrarComentarios: false,
        }
    }

    componentDidMount(){
        let likes = this.props.dataPost.datos.likes

        if(likes.length === 0){
            this.setState({
                like: false
            })
        }
        if(likes.length > 0){
            likes.forEach( like => {if (like === auth.currentUser.email) {
                this.setState({ like: true })
            }})
        }
        
    }


    likear(){
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( res => this.setState({
            like: true,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })

        )
        .catch( e => console.log(e))
    }

    unlike(){
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then( res => this.setState({
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })

        )
        .catch( e => console.log(e))
    }
    comentar(comentario) {
        let elUsuario = this.props.dataPost.datos.owner;
        
        let nuevoComentario = {
          usuario: elUsuario,
          comentario: comentario,
        };
 
        let post = db.collection("posts").doc(this.props.dataPost.id);
  
        post.update({
          comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
        });
      }

    render(){
        console.log(this.props.dataPost)
        return (
            <View style={styles.formContainer}>
              <View style={styles.contenedorNombre}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileUsers', this.props.dataPost.datos.owner)}>
              <Image
            style={styles.fotoPerfil}
            source={{
              uri: this.props.dataPost.datos.fotoPerfil
            }}
          /></TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileUsers', this.props.dataPost.datos.owner)}>
                <Text style={styles.username}>{ this.props.dataPost.datos.userName }</Text>
                </TouchableOpacity>
                <Text style={styles.texto}>{ this.props.dataPost.datos.textoPost }</Text>
              </View>
                <Image style={styles.image} source={{uri:this.props.dataPost.datos.photo }} resizeMode='contain'/>
                <Text style={styles.texto}>Cantidad de Likes:{ this.state.cantidadDeLikes }</Text>
                <View style={styles.contenedorComentarios}>
                {
                    this.state.like ?
                        <TouchableOpacity style={styles.button} onPress={()=>this.unlike()}>
                            <AntDesign name="heart" size={24} color="red" />    
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={()=> this.likear()} >
                            <AntDesign name="heart" size={24} color="white" />    
                        </TouchableOpacity>
                }

              <TextInput
                style={styles.input}
                onChangeText={(texto) => this.setState({ comentarioTexto: texto })}
                placeholder="Escribe un comentario"
                keyboardType="default"
                value={this.state.comentarioTexto}
              />

              <TouchableOpacity style={styles.button2} onPress={() => this.comentar(this.state.comentarioTexto)}>
                <Text>  Enviar</Text>
              </TouchableOpacity>
              </View>
        {
          this.props.dataPost.datos.comentarios ?
            <Text style={styles.texto}>Cantidad de comentarios: {this.props.dataPost.datos.comentarios.length}</Text> :
            <Text style={styles.texto}>No hay comentarios en este posteo</Text>
        }


        <TouchableOpacity onPress={() => this.setState({ mostrarComentarios: !this.state.mostrarComentarios })}>
          <Text style={styles.texto}>
            {this.state.mostrarComentarios ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
          </Text>
        </TouchableOpacity>
        {this.state.mostrarComentarios === true ?
          <FlatList
            data={this.props.dataPost.datos.comentarios}
            keyExtractor={(ok) => ok.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View styles={styles.comentario}>
                  <Text><Text style={styles.username}>{item.usuario}</Text>: {item.comentario}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          :
          <Text></Text>
        }
            </View>

        )
    }

}

const styles = StyleSheet.create({
    formContainer:{
      justifyContent: 'space-evenly',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 5,
        marginBottom: 10,
        padding: 10,
    }, fotoPerfil :{
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#fff',
      marginRight: 10,
  },
    username: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
      color: 'white'
    },
    input:{
      color: 'white',
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
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        height : 30,
        width: 40,
    },
    button2:{
      backgroundColor: 'orange',
      borderColor: '#ccc',
      borderStyle: 'solid',
      borderRadius: 6,
      height : 30,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textButton:{
        color: '#fff'
    },
    image: {
        height: 300,
       },
    texto:{
        color: 'white',
    },
    textButton: {
        color: 'white'
      },
    comentario: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contenedorComentarios:{
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 20,
    },
    contenedorNombre:{
      justifyContent:'space-between',
      flex:1,
      flexDirection: 'column',
      
    }     
})

export default Post;