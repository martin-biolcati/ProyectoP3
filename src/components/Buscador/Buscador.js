import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList} from 'react-native';


class Buscador extends Component {
    constructor(){
        super();
        this.state = {
            backup: [],
            caampoBusqueda: "",
            filtradoUsers: [],
            userId: "",
            infoUser: null,
            usuarios: [],
        }
    }

    componentDidMount(){
        db.collection("users").onSnapshot(
            docs => {
                let usuarios = [];
                docs.forEach(dot => {
                    usuarios.push({
                        id: dot.id,
                        data: dot.data()
                    })
                    this.setState({backup: usuarios})
                })
                console.log('aca')
                console.log(usuarios)
            }
        )
    }

    busqueda(){
        let filtrado = this.state.backup.filter(fil => {
            if(fil.data.owner.toLowerCase().includes(this.state.caampoBusqueda.toLowerCase())) {
                return fil
            }
        console.log('filtrado')
        console.log(filtrado) 
            })
        this.setState({filtradoUsers: filtrado}, () => console.log(this.state.filtradoUsers))    
    }
    usuarioSeleccionado(id){
        this.props.navigation.navigate("ProfileUsers", id)
        console.log(id)
    }
    

   render(){
        return(
            <View>
                <TextInput
                style= {styles.input}
                onChangeText={(text)=> this.setState({caampoBusqueda: text})}
                placeholder='Buscar Perfiles'
                keyboardType='default'
                value={this.state.caampoBusqueda}
                />
                <TouchableOpacity style={styles.button} onPress={()=> this.busqueda()}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
                <Text>Resultados de busqueda para: {this.state.caampoBusqueda}</Text>
                {
                    this.state.filtradoUsers.length > 0 ?
                        <FlatList
                        data={this.state.filtradoUsers}
                        keyExtractor={user => user.id}
                        renderItem= {({item}) =>
                            <TouchableOpacity style={styles.button} onPress={() => this.usuarioSeleccionado()}>
                                <Text>{item.data.userName}</Text>
                                </TouchableOpacity>
                        } 
                        />
                            
                        
                    :
                    
                    <Text>Cargando...</Text>
                }


                
            </View>
        )

        
   }
}
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:600,
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
        backgroundColor:'blue',
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

export default Buscador;