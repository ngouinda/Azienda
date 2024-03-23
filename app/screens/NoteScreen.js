import React from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput} from 'react-native';
import colors from '../colors/colors';

const NoteScreen = () => {
    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.bleuciel} /> 
            <View>
             <Text>Note Screen</Text>
           </View>
        </>
    );
};

export default NoteScreen;