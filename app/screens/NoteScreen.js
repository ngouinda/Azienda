import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, StatusBar, TextInput} from 'react-native';
import colors from '../colors/colors';
import BtnIcon from '../components/BtnIcon';
import SearchBar from '../components/SearchBar';
import NoteInputModal from '../components/NoteInputModal';
//import NoteInputModal from '../components/NoteInputModal';

const NoteScreen = ({user}) => {

    // State permettant de stocher la salutation 
      const [greet, setGreet] = useState('');
      const [modalVisible, setModalVisible] = useState(false);
    // fonction permaetteant de determiner le moment de la journée
    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
      };  
    // Utilisation de useEffect pour exécuter findGreet une seule fois après le rendu initial
      useEffect(() => {
        findGreet();
      }, []);
  

    const handelOnSubmit = (title, desc) =>{
        console.log(title, desc);
    }


    return (
        <>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.bleuciel} /> 
        <View style={styles.container}>
             <Text style={styles.header}>{`Good ${greet} ${user.name}` }</Text>
             <SearchBar containerStyle={{marginVertical: 15}}/>
           <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
              <BtnIcon onPress={() => setModalVisible(true)} antIconName='plus'
               style={styles.addBtn}/>
            </View>
        </View>
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