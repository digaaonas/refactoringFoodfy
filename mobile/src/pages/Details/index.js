import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, Linking, ScrollView, Vibration } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import * as MailComposer from 'expo-mail-composer'

import api from '../../services/api'

import styles from './styles'

export default function Details(){
    const route = useRoute()
    const navigation = useNavigation()

    const reload = true

    const recipie = route.params.recipie

    const [like, setLike] = useState(0)

    async function navigationBack(){

        await api.get('likerecipie',{
            params:{
                id: recipie.id,
                like: like,
                view: 1
            } 
        })

        navigation.navigate('Recipies', {reload})
    }
    
    function likeHeart(){
       
        like ? setLike(0) : setLike(1)
        
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${recipie.whatsapp}`)
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Receita: ${recipie.title}`,
            recipients: [recipie.email],
            body: ''
        })
    }

    return (

        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Feather onPress={() => navigationBack()} name="arrow-left" size={36} color='grey'/>
                <Text style={styles.title}>{recipie.title}</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>    
                    {like ? <Feather onPress={likeHeart} name= "check-square" size={35} color="red" /> : <Feather onPress={likeHeart} name= "square" size={35} color="red" />}
                    <Text style={styles.likes}>Gostei!!! {recipie.likes}</Text>
                    <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                        <Feather name="eye" size={24}/>     
                        <Text style={styles.views}>{recipie.views}</Text>
                    </View>
                </View>
                <Text style={styles.chefename}>Author: {recipie.chefename}</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image source={{uri: recipie.image}} style={{width: 400, height:250, borderRadius: 20, marginBottom: 10}}/>
            </View>

            <ScrollView>
                <View style={styles.contentsBody}>
                    <Text style={styles.titleBody}>Ingredintes:</Text>
                    {recipie.ingredients.map( ingredient => (
                        <View style={styles.contentsRecipies}>
                            <Feather name="droplet" size={10}/>
                            <Text style={styles.contentModal}>{ingredient}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.contentsBody}>
                    <Text style={styles.titleBody}>Preparação:</Text>
                    {recipie.preparation.map( preparation => (
                        <View style={styles.contentsRecipies}>
                            <Feather name="more-vertical" size={10}/>
                            <Text style={styles.contentModal}>{preparation}</Text>
                        </View>   
                    ))}
                </View>

                <View style={styles.contentsBody}>
                    <Text style={styles.titleBody}>Informações adicionais:</Text>
                    <Text style={styles.contentModal}>{recipie.infoadd}</Text>
                </View>
            </ScrollView>      

            <View style={styles.contentApp}> 
                <Text style={{fontSize: 16}}>Deixe sua opinião para o author!</Text>       
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30}}>
                    <View style={styles.buttonAppWpp}><TouchableOpacity onPress={() => sendWhatsapp()}><Text style={styles.textApp}>WhatsApp</Text></TouchableOpacity></View>
                    <View style={styles.buttonAppEmail}><TouchableOpacity onPress={() => sendEmail()}><Text style={styles.textApp}>Email</Text></TouchableOpacity></View>
                </View>
            </View>
        </View>
    )
}