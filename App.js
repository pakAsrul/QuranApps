

import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from './src/screens/SplashScreen'
import Home from './src/screens/Home'
import { MyColors } from './src/BaseComponents'
import DetailSurah from './src/screens/DetailSurah'
import TrackPlayer from 'react-native-track-player'

export default function App() {
  const Stack = createNativeStackNavigator()

  useEffect(() => {
    async function initializePlayer() {
      await TrackPlayer.setupPlayer();
    }
    initializePlayer();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={MyColors.Black} />
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='DetailSurah' component={DetailSurah} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
