import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import Header from '../common/Header';
import Home from './tabs/Home';
import Notification from './tabs/Notification';
import Search from './tabs/Search';
import User from './tabs/User';
import Wishlist from './tabs/Wishlist';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowLister = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideLister = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowLister.remove();
      keyboardDidHideLister.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      {selectedTab === 0 ? (
        <Home />
      ) : selectedTab === 1 ? (
        <Search />
      ) : selectedTab === 2 ? (
        <Wishlist />
      ) : selectedTab === 3 ? (
        <Notification />
      ) : (
        <User />
      )}
      {!isKeyboardVisible && (
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={() => setSelectedTab(0)}>
            <Image
              source={
                selectedTab == 0
                  ? require('../images/home(1).png')
                  : require('../images/home.png')
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab(1)}>
            <Image
              source={require('../images/search.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab(2)}>
            <Image
              source={require('../images/love.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab(3)}>
            <Image
              source={require('../images/bell.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab(4)}>
            <Image
              source={require('../images/man.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
