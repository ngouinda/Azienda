import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback, FlatList} from 'react-native';
import colors from '../colors/colors';
import BtnIcon from '../components/BtnIcon';
import SearchBar from '../components/SearchBar';
import NoteInputModal from '../components/NoteInputModal';
import Note from '../components/Note';



const NoteScreen = ({user}) => {

    // State permettant de stocher la salutation 
      const [greet, setGreet] = useState('');
      const [modalVisible, setModalVisible] = useState(false);

      const [notes, setNotes] = useState([]);
    // fonction permaetteant de determiner le moment de la journée
    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
      };  

     const findNotes = async () =>{
        const result = await AsyncStorage.getItem('notes');

        if(result !== null) setNotes(JSON.parse(result));
    }

    // Utilisation de useEffect pour exécuter findGreet une seule fois après le rendu initial
      useEffect(() => {
        findNotes();
        findGreet();
      }, []);
  

    const handelOnSubmit = async (title, desc) =>{
        const note = { id: Date.now(), title, desc, time: Date.now() };
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes', JSON.stringify (updatedNotes))
    }


    return (
        <>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.bleuciel} /> 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
             <Text style={styles.header}>{`Good ${greet} ${user.name}` }</Text>
             {notes.length ? <SearchBar containerStyle={{marginVertical: 15}}/> : null}
    
             <FlatList data={notes} columnWrapperStyle={{justifyContent:'space-between', marginBottom: 18}} numColumns={2} keyExtractor={item => item.id.toString()
            } renderItem={({item}) => <Note item={item} />}/>
            {!notes.length ? <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
              
            </View> : null}
           
        </View>
        </TouchableWithoutFeedback>
        <BtnIcon onPress={() => setModalVisible(true)} antIconName='plus'style={styles.addBtn}/>
        <NoteInputModal visible={modalVisible} onClose={() => setModalVisible(false)} 
            onSubmit={handelOnSubmit}
        />
        </>
    );
};

const styles = StyleSheet.create({
    header: {
      fontFamily: 'Montserra',
      fontSize: 25,
      fontWeight: 'bold',
    },
    container: {
      paddingHorizontal: 20,
      flex: 1,
      zIndex: 1,
    },
    emptyHeader: {
      fontFamily: 'Montserra',
      fontSize: 30,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      opacity: 0.2,
    },
    emptyHeaderContainer: {
      fontFamily: 'Montserra',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
    },
    addBtn: {
      position: 'absolute',
      right: 15,
      bottom: 50,
      zIndex: 1,
    },
  });
  

export default NoteScreen;