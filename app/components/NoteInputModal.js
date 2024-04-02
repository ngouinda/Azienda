import React, { useState } from 'react';
import { View, StyleSheet, Modal, StatusBar, TextInput,Keyboard, TouchableWithoutFeedback } from 'react-native';
import colors from '../colors/colors';
import BtnIcon from './BtnIcon';


const NoteInputModal = ({visible, onClose, onSubmit}) => {
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

 
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
      onClose();
  };

  const closeModal = () => {
      setTitle('');
      setDesc('');
      onClose();
  }

    return (
         <>
         <StatusBar hiden />
          <Modal visible={visible} animationType='fade'>
          <View style={styles.container}>
            <TextInput value={title} onChangeText={text => handleOnChangeText(text, 'title')} placeholder='Title. . .'  style={[styles.input, styles.title]}/>
            <TextInput value={desc} multiline placeholder='Description. . .'  style={[styles.input, styles.desc]}
             onChangeText={text => handleOnChangeText(text, 'desc')}
            /> 
            <View style={styles.btnContainer}>
              <BtnIcon size={12} antIconName='check'  onPress={handleSubmit}/>
             { title.trim() || desc.trim() ? (
              <BtnIcon size={12} style={{ marginLeft: 25 }}
               antIconName='close'
               onPress={closeModal}
               /> ) : null 
               
             }
            </View>
            
          </View>
          <TouchableWithoutFeedback onPress={handleModalClose}>
             <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
          </TouchableWithoutFeedback>
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
    height:100,
    fontWeight: 'bold',
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