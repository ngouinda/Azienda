import { View, Text, StyleSheet, StatusBar, TextInput, Dimensions} from 'react-native';
import colors from '../colors/colors';
import React, {useState} from 'react';
import BtnIcon from '../components/BtnIcon';

const Home = () => {
  const [name, setName] = useState('');
  const handleOnChangeText = text => setName(text);

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };
  return (
    <>
      <View style={styles.container}>
        <StatusBar hidden/>
        <Text  style={styles.inputTitle}> Please Enter Your Username. . .</Text>
        <TextInput value={name} onChangeText={handleOnChangeText} style={styles.textInput} /> 
      
         {name.trim().length >= 3 ? (
         <BtnIcon antIconName='arrowright' onPress={handleSubmit}/>
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
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,
  },
  inputTitle: {
    fontFamily:'Montserra',
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.7,
  },
});

export default Home;