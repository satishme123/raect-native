import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
const {height, width} = Dimensions.get('window');
const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  isCart,
}) => {
  const cartItems = useSelector(state => state.cart);
  console.log(cartItems.data.length);
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickLeftIcon();
        }}>
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Animatable.Text
        animation="zoomInUp"
        easing="ease-out"
        style={styles.title}>
        {title}
      </Animatable.Text>

      {!isCart && <View></View>}
      {isCart && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <Image source={rightIcon} style={styles.icon} />
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#fff',
              position: 'absolute',
              right: 0,
              top: 0,
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>{cartItems.data.length}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: '#0786DAFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});
