import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  emptyCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import CustomButton from '../common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import {orderItem} from '../redux/slices/OrderSlice';

const Checkout = () => {
  const items = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState(0);
  const isFocused = useIsFocused();
  const [selectedAddresse, setSelectedAddresse] = useState(
    'Please Select Address',
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
  useEffect(() => {
    getSelectedAdress();
  }, [isFocused]);
  const getSelectedAdress = async () => {
    setSelectedAddresse(await AsyncStorage.getItem('MY_ADDRESS'));
  };
  const orderPlace = paymentId => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const years = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    let ampm = '';
    if (hours > 12) {
      ampm = 'pm';
    } else {
      ampm = 'am';
    }
    const data = {
      items: cartItems,
      amount: '$' + getTotal(),
      address: selectedAddresse,
      paymentId: paymentId,
      paymentStatus: selectedMethods === 3 ? 'pending' : 'Success',
      createdAt:
        day +
        '/' +
        month +
        '/' +
        years +
        '~' +
        hours +
        ':' +
        minutes +
        '' +
        ampm,
    };
    dispatch(orderItem(data));
    dispatch(emptyCart());
    navigation.navigate('OrderSuccess');
  };

  const payNow = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'USD',
      key: 'rzp_test_sKXQnXMwxPTGQm', // Your api key
      amount: getTotal() * 100,
      name: 'foo',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: '#3E88BFF'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        orderPlace(data.razorpay_payment_id);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <View style={styles.container}>
      <Header
        title={' Checkout'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Added Items</Text>
      <View>
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
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: 'black',
                        }}
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
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: 'black',
                        }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.totalView}>
        <Text style={styles.title}>Total</Text>
        <Text style={[styles.title, {marginRight: 20}]}>
          {'$' + getTotal()}
        </Text>
      </View>
      <Text style={[styles.title, {marginTop: 10}]}>Select Payment Mode</Text>
      <ScrollView>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => setSelectedMethods(0)}>
          <Image
            source={
              selectedMethods == 0
                ? require('../images/radio-buttons-active.png')
                : require('../images/radio-button.png')
            }
            style={[
              styles.img,
              {tintColor: selectedMethods == 0 ? 'orange' : 'black'},
            ]}
          />
          <Text style={styles.paymentMethodstxt}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => setSelectedMethods(1)}>
          <Image
            source={
              selectedMethods == 1
                ? require('../images/radio-buttons-active.png')
                : require('../images/radio-button.png')
            }
            style={[
              styles.img,
              {tintColor: selectedMethods == 1 ? 'orange' : 'black'},
            ]}
          />
          <Text style={styles.paymentMethodstxt}>Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => setSelectedMethods(2)}>
          <Image
            source={
              selectedMethods == 2
                ? require('../images/radio-buttons-active.png')
                : require('../images/radio-button.png')
            }
            style={[
              styles.img,
              {tintColor: selectedMethods == 2 ? 'orange' : 'black'},
            ]}
          />
          <Text style={styles.paymentMethodstxt}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => setSelectedMethods(3)}>
          <Image
            source={
              selectedMethods == 3
                ? require('../images/radio-buttons-active.png')
                : require('../images/radio-button.png')
            }
            style={[
              styles.img,
              {tintColor: selectedMethods == 3 ? 'orange' : 'black'},
            ]}
          />
          <Text style={styles.paymentMethodstxt}>Cash on Delivery </Text>
        </TouchableOpacity>
        <View style={styles.addressView}>
          <Text style={styles.title}>Address</Text>
          <Text
            style={[
              styles.title,
              {textDecorationLine: 'underline', color: 'lightskyblue'},
            ]}
            onPress={() => navigation.navigate('Addresses')}>
            Edit Address
          </Text>
        </View>

        <Text
          style={[
            styles.title,
            {marginTop: 10, fontSize: 15, color: '#636363'},
          ]}>
          {selectedAddresse}
        </Text>
        <CustomButton
          bg={'green'}
          title={'Pay & Order'}
          color={'#fff'}
          onClick={() => {
            payNow();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  productItem: {
    width: Dimensions.get('window').width,
    // height: 100,
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
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  paymentMethods: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    paddingLeft: 20,
  },
  img: {
    width: 24,
    height: 24,
  },
  paymentMethodstxt: {
    marginLeft: 20,
    fontSize: 15,
    color: '#000',
  },
  addressView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 20,
  },
});
