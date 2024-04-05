import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text, StyleSheet, View, Alert} from 'react-native';

import React, {useState} from 'react'
import colors from '../colors/colors';
import BtnIcon from './BtnIcon';
import { useNotes } from './contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';



// function to format time in H:MM AM/PM
const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
}

//////////////////////////////////////////////////
 const  NoteDetail = props => {
  const [note, setNote] = useState(props.route.params.note);
  const {setNotes} = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
   // Function that handle the delete of a note
  const deleteNote = async ()=>{
    const result = await AsyncStorage.getItem('notes')
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  }
  
  const displayDeleteAlert = () => {
    console.log("delete")
    //alert('Are you sure?', 'your  note will be deleted')
      
    Alert.alert('Are you sure?', 'your  note will be deleted',
    [
      { text: "Cancel", 
      onPress: deleteNote(), 
    },
    {
      text: "No ",
      onPress: () => console.log('no thank you')
    }
    ],{
      cancelable:true,
    } );
  };

  //update function
  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);
  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };


  return (
    <>
      <ScrollView  contentContainerStyle={styles.container}>
      <Text style={styles.time}>
          {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
        </Text>
          <Text  style={styles.title}>{note.title}</Text>
          <Text  style={styles.description}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <BtnIcon
          antIconName='delete'
          style={{ backgroundColor: colors.rouge, marginBottom: 15 }}
          onPress={() => displayDeleteAlert()}
        />
        <BtnIcon antIconName='edit'
          style={{ backgroundColor: colors.vertfonce}}
          onPress={() => openEditModal() }/>
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
  </>
  );
};

const styles = StyleSheet.create({
  container: {

    paddingHorizontal: 15,
    marginTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.vertfonce,


  },
   description: {
    fontSize: 22,
    opacity: 0.6,
   },
   time: {
    textAlign: 'right',
    fontSize: 15,
    opacity: 0.5,
   },
   btnContainer:{
    position: 'absolute',
    right: 15,
    bottom: 50,
   }
});
  export default  NoteDetail;