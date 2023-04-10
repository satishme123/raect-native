import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const User = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../../images/man.png')} style={styles.user} />
      <Text style={styles.name}>{'Satish'}</Text>
      <Text style={[styles.name, {fontSize: 16, marginTop: 0}]}>
        {'satishmewada@gmail.com'}
      </Text>
      <TouchableOpacity style={[styles.tab, {marginTop: 40}]}>
        <Text style={styles.txt}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => navigation.navigate('Order')}>
        <Text style={styles.txt}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.txt}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.txt}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.txt}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 100,
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    borderBottomColor: 'grey',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  txt: {
    color: 'black',
  },
});
