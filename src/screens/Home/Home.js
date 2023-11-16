import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { db, auth } from '../../firebase/config';
import PostForm from '../PostForm/PostForm';
import Post from '../../components/Post/Post';
import Profile from '../Profile/Profile';
import Buscador from '../../components/Buscador/Buscador'

class Home extends Component {
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }

    componentDidMount(){
            db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(
            listaPosts => {
                let postsAMostrar = [];

                listaPosts.forEach(unPost => {
                    postsAMostrar.push({
                        id:unPost.id,
                        datos: unPost.data()            
                    })
                })

                this.setState({
                    posts:postsAMostrar
                })
            }
        )

    }


    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login')
    }

    render(){
        console.log(this.state);
        return(
            <View style={styles.contenedor}>
                <Text style={styles.texto}>Lista de posteos creados</Text>
                {this.state.posts.length === 0 ? 
                
                 <View>
                    <ActivityIndicator size='large' color='white' />
                </View>
                :
                <FlatList
                    data={this.state.posts}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post dataPost = {item} navigation={this.props.navigation}/>  }/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        backgroundColor:'grey',
    },
    texto:{
         color: 'white',
     }

  })
  

export default Home;