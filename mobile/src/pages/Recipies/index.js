import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import logoImg from '../../assets/logo.png'

import styles from './styles'

import api from '../../services/api'

export default function Recipies(){
    const navigation = useNavigation()
    const route = useRoute()
    
    const [recipies, setRecipies] = useState([])

    function navigateToDetail(recipie){
        navigation.navigate('Details', { recipie })
    }

    useEffect(() => {
        api.get('recipies').then(response => {
            setRecipies(response.data)
        })
        
    }, [recipies])

    return (
        <View style={styles.container}>
      
            <View style={styles.header}>
                <Text style={styles.title}>Bem vindo</Text>
                <Image source={logoImg}/>
            </View>

            <FlatList
            style={styles.recipiesList}
            data={recipies}
            keyExtractor={recipies => String(recipies.id)}
            showsVerticalScrollIndicator={false}
            renderItem={ ({ item: recipies }) => (
                <View style={styles.contentRecipie}>
                    <Image source={{uri: recipies.img}} style={styles.image}/>
                        <View style={styles.contentTitleMore}>
                            <View style={styles.contentTitle}>
                                    <Text style={styles.recipieTitle}>{recipies.title}</Text>
                                    
                                <View style={styles.contentDataChef}>
                                    <Text style={styles.nameChefe}>{recipies.chefename}</Text>
                                    <Image source={{uri: recipies.avatar_url}} style={{width: 45, height: 45, borderRadius: 45}}/>
                                </View>
                            </View>
                            <View style={{flexDirection: "column", alignItems: "center"}}>    
                                    <Text style={{paddingBottom: 10}}><Feather name="eye" size={16} color="grey"/> {recipies.views}</Text>
                                    <Text style={{paddingBottom: 30}}><Feather name="heart" size={16} color="red"/> {recipies.likes}</Text>
                                    <TouchableOpacity 
                                    onPress={() => navigateToDetail(recipies)}
                                    >   
                                    <Text style={styles.buttonMore}>Ver mais... </Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </View>
            )}
            />

        </View>
    )
}