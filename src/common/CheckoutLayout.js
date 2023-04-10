import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CheckoutLayout = ({total, items}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Text
          style={{
            fontWeight: '600',
            color: 'black',
          }}>{`(items) ${items}`}</Text>
        <Text style={styles.total}>{'Total: $' + total}</Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => {
            navigation.navigate('Checkout');
          }}>
          <Text style={{color: '#fff'}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutLayout;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  tab: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  checkout: {
    width: '80%',
    height: '60%',
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    fontWeight: '700',
    fontSize: 18,
    color: 'black',
  },
});
