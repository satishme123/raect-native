import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';
import * as Animatable from 'react-native-animatable';
const Search = () => {
  const products = useSelector(state => state);
  const [search, setSearch] = useState('');
  const [oldData, setOldData] = useState(products.product.data);
  const [searchedList, setSearchedList] = useState(oldData);
  const navigation = useNavigation();

  const filterData = txt => {
    let newData = oldData.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    setSearchedList(newData);
  };
  return (
    <View style={styles.conatiner}>
      <Header title={'Search Items'} />
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../images/search.png')}
            style={styles.icon}
          />
          <TextInput
            value={search}
            placeholderTextColor="grey"
            onChangeText={txt => {
              setSearch(txt);
              filterData(txt);
            }}
            placeholder="Search items here.."
            style={styles.input}
          />
        </View>
        {search !== '' && (
          <TouchableOpacity
            styles={[
              styles.icon,
              {justifyContent: 'center', alignItems: 'center'},
            ]}
            onPress={() => {
              setSearch('');
              filterData('');
            }}>
            <Image
              source={require('../../images/close.png')}
              style={[styles.icon, {width: 16, height: 16}]}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: 50}}>
        <FlatList
          data={searchedList}
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
                    <Image
                      source={{uri: item.image}}
                      style={styles.itemImage}
                    />
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
      </View>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'center',
  },
  input: {
    width: '70%',
    marginLeft: 10,
    color: 'black',
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
