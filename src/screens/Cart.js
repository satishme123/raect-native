import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import CheckoutLayout from '../common/CheckoutLayout';
import Header from '../common/Header';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';

const Cart = () => {
  const items = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  console.log(JSON.stringify(items) + '' + items.data.length);
  useEffect(() => {
    setCartItems(items.data);
  }, [items]);
  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };
  return (
    <View style={styles.container}>
      <Header
        title={'Cart Items'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={cartItems}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}
              onPress={() => {
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <View style={styles}>
                <Text style={styles.title}>
                  {item.title.length > 20
                    ? item.title.substring(0, 20) + '...'
                    : item.title}
                </Text>
                <Text style={styles.description}>
                  {item.description.length > 30
                    ? item.description.substring(0, 30) + '...'
                    : item.description}
                </Text>
                <View style={styles.qtyview}>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                  <TouchableOpacity style={styles.btn}>
                    <Text
                      style={{fontSize: 18, fontWeight: '600', color: 'black'}}
                      onPress={() => {
                        if (item.qty > 1) {
                          dispatch(reduceItemFromCart(item));
                        } else {
                          dispatch(removeItemFromCart(index));
                        }
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item.qty}</Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      dispatch(addItemToCart(item));
                    }}>
                    <Text
                      style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {cartItems.length < 1 && (
        <View style={styles.noItems}>
          <Text style={{color: 'black'}}>No items in Cart</Text>
        </View>
      )}
      {cartItems.length > 0 && (
        <CheckoutLayout total={getTotal()} items={cartItems.length} />
      )}
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productItem: {
    width: Dimensions.get('window').width,
    // height: 'auto',
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    color: 'black',
  },
  description: {
    marginLeft: 20,
    color: 'black',
  },
  price: {
    fontSize: 18,
    color: 'green',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  qtyview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    padding: 4,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
});
