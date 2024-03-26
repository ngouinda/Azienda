import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import DashScreen from './app/screens/DashScreen';
import Intro from "./app/screens/Intro";
import NoteScreen from './app/screens/NoteScreen';

export default function App() { 
  const [user, setUser] = useState({})
    const findUser = async () =>{
    const result = await AsyncStorage.getItem('user')
    setUser(JSON.parse(result))
  };

  useEffect (() => {
     findUser()
  }, []);
  
  return <NoteScreen user={user}/>;
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
