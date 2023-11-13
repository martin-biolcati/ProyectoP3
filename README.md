# ProyectoP3
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