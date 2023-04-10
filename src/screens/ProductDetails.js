import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AskForLoginModal from '../common/AskForLoginModal';
import CustomButton from '../common/CustomButton';
import Header from '../common/Header';
import {addItemToCart} from '../redux/slices/CartSlice';
import {addItemToWishlist} from '../redux/slices/WishlistSlice';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const checkUserStatus = async () => {
    let isUserLoggedIn = false;
    const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    if (status === null) {
      isUserLoggedIn = false;
    } else {
      isUserLoggedIn = true;
    }
    return isUserLoggedIn;
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        rightIcon={require('../images/bag.png')}
        title={'Product Detail'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <ScrollView>
        <Image source={{uri: route.params.data.image}} style={styles.banner} />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>{route.params.data.description}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.price, {color: '#000'}]}>{'Price: '}</Text>
          <Text style={styles.price}>{'$' + route.params.data.price}</Text>
          <View style={(styles.qtyView, {flexDirection: 'row'})}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setQty(qty + 1);
              }}>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.whishlistBtn}
          onPress={() => {
            dispatch(addItemToWishlist(route.params.data));
            // or (checkUserStatus()===true)
            // if (!checkUserStatus()) {
            //   dispatch(addItemToWishlist(route.params.data));
            // } else {
            //   setModalVisible(true);
            // }
          }}>
          <Image source={require('../images/love.png')} style={styles.icon} />
        </TouchableOpacity>

        <CustomButton
          bg={'orange'}
          title={'Add To Cart'}
          color={'white'}
          onClick={() => {
            // dispatch(addItemToCart({...route.params.data}));
            // if (!checkUserStatus()) {
            //   dispatch(
            //     addItemToCart({
            //       category: route.params.data.category,
            //       description: route.params.data.description,
            //       id: route.params.data.id,
            //       image: route.params.data.image,
            //       price: route.params.data.price,
            //       qty: qty,
            //       rating: route.params.data.rating,
            //       title: route.params.data.title,
            //     }),
            //   );
            // } else {
            //   setModalVisible(true);
            // }
            dispatch(
              addItemToCart({
                category: route.params.data.category,
                description: route.params.data.description,
                id: route.params.data.id,
                image: route.params.data.image,
                price: route.params.data.price,
                qty: qty,
                rating: route.params.data.rating,
                title: route.params.data.title,
              }),
            );
          }}
        />
      </ScrollView>
      <AskForLoginModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onClickLogin={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
        onClickSignUp={() => {
          setModalVisible(false);
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  desc: {
    color: '#000',

    fontSize: 16,
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
  },
  price: {
    color: 'green',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '800',
  },
  whishlistBtn: {
    position: 'absolute',
    right: 10,
    top: 50,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 24,
    height: 24,
  },
  qtyview: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
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
});
