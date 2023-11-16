import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput,FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {

    constructor(props){
        super(props);

        this.state = {
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length,
            comentarioTexto: "",
            comentarios: [],
            mostrarComentarios: false,
            // cantComentarios: this.props.dataPost.datos.comentarios.length
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
        //Quita un email en la propiedad like del post.
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
            <View>
                <Image style={styles.image} source={{uri:this.props.dataPost.datos.photo }} resizeMode='contain'/>
                <Text style={styles.texto}>{ this.props.dataPost.datos.userName }</Text>
                <Text style={styles.texto}>{ this.props.dataPost.datos.textoPost }</Text>
                
                

                <View styles={styles.comentario}>
                    <Text style={styles.texto}><Text style={styles.username}>{this.props.dataPost.datos.owner}</Text></Text>
                </View>

                {
                    this.state.like ?
                        <TouchableOpacity style={styles.button} onPress={()=>this.unlike()}>
                            <Text style={styles.textButton}>unLike</Text>    
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={styles.button} onPress={()=> this.likear()} >
                            <Text style={styles.textButton}>Likear</Text>    
                        </TouchableOpacity>
                }
<Text style={styles.texto}>Cantidad de Likes:{ this.state.cantidadDeLikes }</Text>
<TextInput
          style={styles.input}
          onChangeText={(texto) => this.setState({ comentarioTexto: texto })}
          placeholder="Agregar comentario"
          keyboardType="default"
          value={this.state.comentarioTexto}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.comentar(this.state.comentarioTexto)}>
          <Text> Agregar comentario</Text>
        </TouchableOpacity>
        {
          this.props.dataPost.datos.comentarios ?
            <Text>Cantidad de comentarios: {this.props.dataPost.datos.comentarios.length}</Text> :
            <Text> No hay comentarios en este posteo</Text>
        }


        <TouchableOpacity onPress={() => this.setState({ mostrarComentarios: !this.state.mostrarComentarios })}>
          <Text>
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
        paddingHorizontal:10,
        marginTop: 20,
        borderRadius: 8,
        margin: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
          
    }, 
    username: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
      color: 'white'
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
        backgroundColor:'orange',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'orange',
    },
    textButton:{
        color: '#fff'
    },
    image: {
        height: 400,
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
      }
    

     
})

export default Post;