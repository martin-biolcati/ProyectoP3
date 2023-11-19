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
          <View style={styles.container}>{this.state.userEnUso.length > 0 ? (
            <>
              <View style={styles.flexUno}>
                <Text style={styles.textoBlanco}>
                    Nombre de usuario: {this.state.userEnUso[0].user.userName}  
                </Text>
                <Text style={styles.textoBlanco}>
                  Email: {auth.currentUser.email}
                </Text>
                
                 <Text style={styles.textoBlanco}>Mini bio: {this.state.userEnUso[0].user.bio}</Text> 
                  
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
      padding : 30,
      backgroundColor: 'grey',
      color : 'white'
    },
    textoBlanco: {
        color: 'white',
        },
      flexUno: {
        flex : 1,
        },
        flexDos: {
          flex : 2
          },
          fotoPerfil : {
            height: 40,
            width: 40,
            borderWidth: 1,
            borderRadius: 25,
            borderColor: 'rgb(240, 228, 228)',
            marginRight: 10
           },
            loader: {
            display : 'flex',
            flex : 1,
            justifyContent : 'center',
            marginTop : 300
          }
  })


export default Profile;