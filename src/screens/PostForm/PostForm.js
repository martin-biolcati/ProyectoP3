import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import MyCamera from '../../components/MyCamera/MyCamera';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

class PostForm extends Component {
    constructor(props) {
        super();
        this.state = {
            textPost: "",
            urlPost: '',
            usuario: auth.currentUser.email,
            usuarios: [],
            showCamera: true,
        }
        console.log(this.state.textPost)
    }


    componentDidMount() {
        db.collection('users').where("owner", "==", this.state.usuario).onSnapshot(
            docs => {
                let ahoraUsuario = [];
                docs.forEach(doc => {
                    ahoraUsuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({ usuarios: ahoraUsuario })
                })
            }
        )
    }
    crearPost(){
        const userName = this.state.usuarios.length > 0 ? this.state.usuarios[0].data.userName : ''
        const fotoPerfil = this.state.usuarios.length > 0 ? this.state.usuarios[0].data.fotoPerfil : '';
        db.collection('posts').add({
            userName: userName,
            fotoPerfil: fotoPerfil,
            owner: this.state.usuario,
            textoPost: this.state.textoPost,
            createdAt: Date.now(), 
            photo: this.state.url,
            likes: [],
        })
        .then( res => console.log("Posteaste"))
        .catch( e => console.log(e))
    }
    onImageUpload(url){
        this.setState({url: url, showCamera: false});
    }

    render(){
        return(
            <View style={styles.formContainer}>
               <Image
                    style={styles.image} 
                    source={require('../../../assets/Banner.png')}
                    resizeMode='contain' />
                {this.state.showCamera ? <MyCamera onImageUpload={(url)=> this.onImageUpload(url)}/> :
                
                <>
                
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({textoPost: text})}
                placeholder='Escribir...'
                keyboardType='default'
                value={this.state.textoPost}
                />
               
                <></>                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.crearPost();
                        this.props.navigation.navigate('Home');
                        this.setState({ showCamera: true });
                    }}
                    >
                    <Text style={styles.textButton}>Postear</Text>
                </TouchableOpacity>
                </>}
            </View>
        )
        }}


const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        paddingHorizontal:10,
        backgroundColor:'grey',
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
        color:'white'
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
    },
    image: {
       height: 50,
   },
   texto:{
        color: 'white',
    }

})


export default PostForm;
