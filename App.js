import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/Appnavigator';
import {store} from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
