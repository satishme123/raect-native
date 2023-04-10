import AddAddress from './screens/AddAddress';
import Addresses from './screens/Addresses';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import Login from './screens/Login';
import Main from './screens/Main';
import Orders from './screens/Orders';
import OrderSuccess from './screens/OrderSuccess';
import ProductDetail from './screens/ProductDetails';
import Signup from './screens/Signup';

const {NavigationContainer} = require('@react-navigation/native');
const {createNativeStackNavigator} = require('@react-navigation/native-stack');

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Addresses"
          component={Addresses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccess}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={Orders}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
