const {configureStore} = require('@reduxjs/toolkit');
import AddressSlice, {AdreessSlice} from './slices/AddressSlice';
import CartSlice from './slices/CartSlice';
import OrderSlice from './slices/OrderSlice';
import ProductsSlice from './slices/ProductsSlice';
import WishlistSlice from './slices/WishlistSlice';

export const store = configureStore({
  reducer: {
    product: ProductsSlice,
    wishlist: WishlistSlice,
    cart: CartSlice,
    address: AddressSlice,
    order: OrderSlice,
  },
});
