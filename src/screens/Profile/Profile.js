import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';

class Profile extends Component {
    constructor(){
        super()
        this.state={
           userEnUso:[],
           listPost:[]
        }
    }

    componentDidMount(){
         db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
             posteos => {
                 let postsARenderizar = [];

                 posteos.forEach( onePost => {
                                 postsARenderizar.push(
                                     {id : onePost.id,
                                     datos : onePost.data()})})

             this.setState({
                 listaPost : postsARenderizar
             })
         })
         db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            usuario => {
                let usuarioIndicado = [];

                usuario.forEach( actual => {
                                usuarioIndicado.push(
                                    {id : actual.id,
                                    user : actual.data()})})

            this.setState({
                userEnUso : usuarioIndicado
            })
        })}
         
    logout(){
            auth.signOut();
            this.props.navigation.navigate('Login')
        }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Nombre del usuario: {this.state.userEnUso[0].user.userName}</Text>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Mini Bio: {auth.currentUser.bio}</Text>
                <Text>Foto de perfil: </Text>
                <Text>Cantidad de Posteos:</Text>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.listPost}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post dataPost = {item} navigation={this.props.navigation}/>  }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        paddingHorizontal:10,
        marginTop: 20,
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


export default Profile;