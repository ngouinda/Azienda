import { ScrollView, Text, StyleSheet, View, Alert } from 'react-native';

import React from 'react'
import colors from '../colors/colors';
import BtnIcon from './BtnIcon';


// function to format time in H:MM AM/PM
const foramtDate = ms => {
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
  const { note} = props.route.params;

  
  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: () => console.log('delet note'),
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  

  return (
    <>
      <ScrollView  contentContainerStyle={styles.container}>
          <Text  style={styles.time}>{`Createad At ${foramtDate(note.time)} `}</Text>
          <Text  style={styles.title}>{note.title}</Text>
          <Text  style={styles.description}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <BtnIcon
          antIconName='delete'
          style={{ backgroundColor: colors.rouge, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <BtnIcon antIconName='edit'  onPress={() => console.log("edit")}/>
      </View>
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