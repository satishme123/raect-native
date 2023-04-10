import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../../common/Header';
import {addProducts} from '../../redux/slices/ProductsSlice';
import * as Animatable from 'react-native-animatable';
// import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
// import LinearGradient from 'react-native-linear-gradient';
// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  console.log(loaded);
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    fetch('http://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        json.map(item => {
          item.qty = 1;
        });
        dispatch(addProducts(json));
        // setLoaded(true);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../images/menu.png')}
        rightIcon={require('../../images/bag.png')}
        title={'Ecom App'}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        isCart={true}
      />

      <FlatList
        data={products}
        renderItem={({item, index}) => {
          return (
            <ScrollView>
              <Animatable.View
                animation={'fadeInUp'}
                duration={1000}
                delay={index * 300}>
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
              </Animatable.View>
            </ScrollView>
          );
        }}
      />

      {/* {loaded === false ? null : (
        <ShimmerPlaceholder
          style={{
            width: 150,
            height: 20,
            marginTop: 10,
          }}></ShimmerPlaceholder>
      )} */}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
