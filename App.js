import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Intro from "./app/screens/Intro";
import NoteScreen from './app/screens/NoteScreen';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/components/contexts/NoteProvider';

const Stack = createNativeStackNavigator();
 
export default function App() { 
  const [user, setUser] = useState({})
    const findUser = async () =>{
    const result = await AsyncStorage.getItem('user')
    
    if (result !== null){
       setUser(JSON.parse(result))
        
    }
    
  };

  useEffect (() => {
    findUser()
    
     
  }, []);

  const renderNoteScreen = (props) => <NoteScreen {...props} user={user}/>;

  if ( !user.name) return <Intro onFinsih={findUser}/>;

  return( <NavigationContainer>
    <NoteProvider>
      <Stack.Navigator  screenOptions={{ headerTitle: '', headerTransparent: true }}>
           <Stack.Screen component={renderNoteScreen} name="NoteScreen"  />
           <Stack.Screen component={NoteDetail} name="NoteDetail"  />
      </Stack.Navigator>
    </NoteProvider>  
  </NavigationContainer>)
  
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
