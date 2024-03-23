import React, { useEffect, useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import DashScreen from './app/screens/DashScreen';
import Home from './app/screens/Home'; 
import NoteScreen from './app/screens/NoteScreen';



//const Stack = createNativeStackNavigator();

const findUser = async () => {
  const result = await AsyncStorage.getItem('user');

  // if (result === null) return setIsAppFirstTimeOpen(true);

  // setUser(JSON.parse(result));
  // setIsAppFirstTimeOpen(false);
};
export default function App() {
  useEffect(() => {
    findUser();
  }, [])

  return <NoteScreen/>
    
}
