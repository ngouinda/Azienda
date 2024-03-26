import AsyncStorage from '@react-native-async-storage/async-storage';
import { View , TextInput, Text, Dimensions ,StyleSheet, StatusBar } from 'react-native';
import colors from '../colors/colors';
import { useState } from 'react';
import BtnIcon from '../components/BtnIcon';



const Intro = ({onFinsih}) => {
    const [name, setName] = useState('');
    const handleOnChangeText = text => setName(text);
    // console.log(name)

    const handleSubmit = async () =>{
        const user = { name:name }
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if(onFinsih) onFinsih();
    }
    return (
        <>
          <StatusBar hiden />
          <View style={styles.container}>
               <Text style={styles.inputTitle}> Please Enter Your Username. . .</Text>
               <TextInput value={name} onChangeText={handleOnChangeText} style={styles.textInput}/>
               {name.trim().length >= 3 ? (
               <BtnIcon antIconName='arrowright' onPress={handleSubmit} />
               ) : null}
          </View> 
        </>
    );
};

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.bleufonce,
    color: colors.bleufonce,
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,
  },
  inputTitle: {
    fontFamily: 'Montserra',
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
  },
});
export default Intro;