import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Orders = () => {
  const navigation = useNavigation();
  const ordersList = useSelector(state => state.order);
  console.log(ordersList);
  return (
    <View style={styles.container}>
      <Header
        title={' Orders'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={ordersList.data}
        renderItem={({item, index}) => {
          return (
            <View style={styles.orderItem}>
              <FlatList
                data={item.items}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.productItem}>
                      <Image
                        source={{uri: item.image}}
                        style={styles.itemImage}
                      />
                      <View style={styles.nameView}>
                        <Text style={styles.title}>
                          {item.title.length > 20
                            ? item.title.substring(0, 20)
                            : item.title}
                        </Text>
                        <Text>
                          {item.description.length > 25
                            ? item.description.substring(0, 27)
                            : item.description}
                        </Text>
                        <Text style={styles.price}>{'Rs.' + item.price}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  orderItem: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    borderColor: '#000000',
  },
  productItem: {
    width: '95%',
    // height: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  itemImage: {
    width: 50,
    // height: 50,
  },
  nameView: {
    marginLeft: 10,
  },
  price: {
    color: 'green',
  },
  title: {
    color: 'black',
    fontWeight: '500',
  },
});
