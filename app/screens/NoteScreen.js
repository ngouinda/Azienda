import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, StatusBar, TextInput} from 'react-native';
import colors from '../colors/colors';
import BtnIcon from '../components/BtnIcon';
//import NoteInputModal from '../components/NoteInputModal';

const NoteScreen = ({user}) => {

    // State permettant de stocher la salutation 
      const [greet, setGreet] = useState('');
    
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


    return (
        <>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.bleuciel} /> 
        <View style={styles.container}>
             <Text style={styles.header}>{`Good ${greet} ${user.name}` }</Text>
           <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
              <BtnIcon onPress={() => console.log('click')} antIconName='plus' style={styles.addBtn}/>
            </View>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    container: {
      paddingHorizontal: 20,
      flex: 1,
      zIndex: 1,
    },
    emptyHeader: {
      fontSize: 30,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      opacity: 0.2,
    },
    emptyHeaderContainer: {
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