const {createSlice} = require('@reduxjs/toolkit');

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToWishlist(state, action) {
      let tempData = state.data;
      tempData.push(action.payload);
      state.data = tempData;
    },
  },
});
export const {addItemToWishlist} = WishlistSlice.actions;
export default WishlistSlice.reducer;
