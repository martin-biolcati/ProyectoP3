import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {

    constructor(props){
        super(props);

        this.state = {
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
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


    render(){
        return (
            <View>
                <Text>{ this.props.dataPost.datos.owner }</Text>
                <Text>{ this.props.dataPost.datos.textoPost }</Text>
                <Image style={styles.image} source={{uri:this.props.dataPost.datos.photo }} resizeMode='contain'/>
                <Text>Cantidad de Likes:{ this.state.cantidadDeLikes }</Text>
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
            </View>

        )
    }

}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
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
        backgroundColor:'orange',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'orange'
    },
    textButton:{
        color: '#fff'
    },
    image: {
        height: 300,
       }
     
})

export default Post;