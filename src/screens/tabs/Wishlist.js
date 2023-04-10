import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';

const Wishlist = () => {
  const items = useSelector(state => state.wishlist);
  const [wishlistItems, setWhishlistItems] = useState(items.data);
  const navigation = useNavigation();
  console.log(JSON.stringify(items) + '' + items.data.length);
  return (
    <View style={styles.container}>
      <Header title={'wishlist Items'} />
      <FlatList
        data={wishlistItems}
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
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Wishlist;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
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
});
