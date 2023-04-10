import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAddress} from '../redux/slices/AddressSlice';

const Addresses = () => {
  const navigation = useNavigation();
  const addressList = useSelector(state => state.address);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log(addressList);
  }, [isFocused]);
  const defaultAddress = async item => {
    await AsyncStorage.setItem(
      'MY_ADDRESS',
      '' +
        item.city +
        '' +
        item.state +
        '' +
        item.pincode +
        'type: ' +
        item.type,
    );
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header
        title={'My Addresses'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={addressList.data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '90%',
                backgroundColor: '#fff',
                borderWidth: 0.5,
                alignSelf: 'center',
                marginTop: 20,
                marginLeft: 15,
                marginBottom: 10,
                paddingTop: 10,
                borderRadius: 10,
                paddingBottom: 10,
                paddingLeft: 10,
              }}
              onPress={() => {
                defaultAddress(item);
              }}>
              <Text style={styles.state}>{`State: ${item.state}`}</Text>
              <Text style={styles.state}> {`City: ${item.city}`}</Text>
              <Text style={styles.state}>{`Pincode: ${item.pincode}`}</Text>
              <Text
                style={[
                  styles.state,
                  {
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    backgroundColor: 'lightgrey',
                    padding: 5,
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: '600',
                  },
                ]}>
                {item.type}
              </Text>
              <View style={styles.bottomView}>
                <TouchableOpacity
                  style={[styles.icon, {marginRight: 10}]}
                  onPress={() =>
                    navigation.navigate('AddAddress', {
                      type: 'edit',
                      data: item,
                    })
                  }>
                  <Image
                    source={require('../images/edit.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    dispatch(deleteAddress(item.id));
                  }}>
                  <Image
                    source={require('../images/trash.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={item =>
          navigation.navigate('AddAddress', {
            type: 'new',
          })
        }>
        <Text
          style={{
            fontSize: 30,
            color: '#fff',
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  state: {
    color: 'black',
    fontSize: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
  bottomView: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
