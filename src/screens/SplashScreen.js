import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MyColors } from '../BaseComponents'
import { StackActions, useNavigation } from '@react-navigation/native'

export default function SplashScreen() {

    const nav = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.txtTitle}>MyQuran App</Text>
                <Text style={styles.txtSubTitle}>Learn Quran and Recite once everyday</Text>
            </View>
            <View>
                <Image source={require('../assets/images/splashImg.png')} />
                <TouchableOpacity style={styles.btnStarted} onPress={()=>{nav.dispatch(StackActions.replace('Home'))}}>
                    <Text style={styles.txtBtn}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    txtBtn :{
        color : '#091945',
        fontFamily : 'MSmb',
        fontSize : 18
    },
    txtSubTitle : {
        fontFamily : 'Mreg',
        color : MyColors.Gray,
        fontSize : 18,
        maxWidth : 195,
        textAlign : 'center',
        marginTop : 16
    },
    txtTitle :{
        fontFamily : 'MBold',
        color : MyColors.White,
        fontSize : 28
    },
    btnStarted : {
        backgroundColor : MyColors.Brown,
        paddingHorizontal : 40,
        paddingVertical : 16,
        borderRadius : 30,
        position : 'absolute',
        bottom : -18,
        left : 65,
    },
    containerTitle : {
        alignItems : 'center',
        marginTop : 86,
        marginBottom : 50
    },
    container : {
        alignItems : 'center',
        backgroundColor : MyColors.Black,
        flex : 1,
    }
})