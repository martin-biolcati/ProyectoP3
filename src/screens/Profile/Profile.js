import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator, Image} from 'react-native';
import Post from '../../components/Post/Post';

class Profile extends Component {
    constructor(){
        super()
        this.state={
           userEnUso:{},
           listPost:[]
        }
    }

    componentDidMount(){
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

            })

        db.collection('posts').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
            posteos => {
                let postsARenderizar = [];

                posteos.forEach( onePost => {
                                postsARenderizar.push(
                                    {id : onePost.id,
                                    datos : onePost.data()})})

            this.setState({
                listaPost : postsARenderizar
            })
           
           
            }
        )
    }

    logout() {
        auth.signOut();
        this.props.navigation.navigate ("Login")
    }

    render() {
        return (
          <View style={styles.container}>
            <Image
                    style={styles.image} 
                    source={require('../../../assets/Banner.png')}
                    resizeMode='contain' />
            {this.state.userEnUso.length > 0 ? (
              <>
                <View style={styles.flexUno}>
                  <Text style={styles.textoBlanco}>
                      Nombre de usuario: {this.state.userEnUso[0].user.userName}  
                  </Text>
                  <Text style={styles.textoBlanco}>
                    Email: {auth.currentUser.email}
                  </Text>
                  <Image style={styles.fotoPerfil} source={{ uri: this.state.userEnUso[0].user.fotoPerfil }} />
                   <Text style={styles.textoBlanco}>Mini bio: {this.state.userEnUso[0].user.bio}</Text> 
                     {/* <Image style={styles.fotoPerfil}  source={{uri:''}} resizeMode='contain'/>   */}
                  <TouchableOpacity onPress={() => this.logout()}>
                  <Text style={styles.textoBlanco}>Logout</Text>
                </TouchableOpacity>
                </View>
      
                <View style={styles.flexDos}> 
                 <FlatList
                    data={this.state.listaPost}
                    keyExtractor={(onePost) => onePost.id}
                    renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation} />}
                  />
                </View>
      

                </>
            ) : (
              <View>
                <ActivityIndicator size='large' color="white" style={styles.loader}  />
              </View>
            )}
          </View>
        );
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


export default Profile;