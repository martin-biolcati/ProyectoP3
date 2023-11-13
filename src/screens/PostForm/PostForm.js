import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import MyCamera from '../../components/MyCamera/MyCamera';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           showCamera: true, 
           url: ''
        }
    }

    crearPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            textoPost: this.state.textoPost,
            createdAt: Date.now(), 
            photo: this.state.url,
            likes: [],
        })
        .then( res => console.log(res))
        .catch( e => console.log(e))
    }

    onImageUpload(url){
        this.setState({ url: url , showCamera: false});
      }


    render(){
        return(
            <View style={styles.formContainer}>
                <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />     
                <Text>New Post</Text>
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({textoPost: text})}
                placeholder='Escribir...'
                keyboardType='default'
                value={this.state.textoPost}
                />
               
                <></>                
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost()}>
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
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


export default PostForm;
