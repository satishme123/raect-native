import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import CustomButton from '../common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [pass, setPass] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const addUser = () => {
    firestore()
      .collection('Users')
      .add({
        name: name,
        email: email,
        mobile: mobile,
        password: pass,
      })
      .then(() => {
        console.log('User added!');
        navigation.navigate('Login');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Sign up'}</Text>
      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="grey"
        color="black"
        style={styles.input}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter Email"
        placeholderTextColor="grey"
        color="black"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Mobile"
        placeholderTextColor="grey"
        color="black"
        style={styles.input}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter password"
        placeholderTextColor="grey"
        color="black"
        style={styles.input}
        value={pass}
        onChangeText={txt => setPass(txt)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        placeholderTextColor="grey"
        color="black"
        style={styles.input}
        value={confirmpass}
        onChangeText={txt => setConfirmPass(txt)}
      />
      <CustomButton
        bg={'orange'}
        title={'Sign up'}
        color={'#fff'}
        onClick={() => {
          addUser();
        }}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        {'Login'}
      </Text>
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underLine',
  },
});
