import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import PostForm from '../PostForm/PostForm';
import Post from '../../components/Post/Post';
import Profile from '../Profile/Profile';

class Home extends Component {
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }

    componentDidMount(){
            db.collection('posts').onSnapshot(
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
            <View>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home')}>
                <Text>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
               
                <Text>Crear nuevo post</Text>

                <Text>Lista de posteos creados</Text>
                
                <FlatList
                    data={this.state.posts}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post dataPost = {item} />  }
                />
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Profile')}>
                   <Text>Perfil</Text>
                </TouchableOpacity>

            </View>
        )
    }
}



export default Home;