import React from 'react';

import { View, StyleSheet, Modal, StatusBar, TextInput } from 'react-native';
import colors from '../colors/colors';
// import BtnIcon from './BtnIcon';

const NoteInputModal = ({visible}) => {
    return (
         <>
         <StatusBar hiden />
          <Modal visible={visible} animationType='fade'>
          <View style={styles.container}>
             <TextInput style={[styles.input, styles.title]}/>
             <TextInput style={[styles.input, styles.desriotion]}/>
             
          </View>
        </Modal>  
           
        </>  
           
        )        

};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.bleufonce,
    fontSize: 20,
    color: colors.bleufonce,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});
export default NoteInputModal;