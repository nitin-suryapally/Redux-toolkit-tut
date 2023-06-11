import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 9,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async () => {
    // console.log(thunkAPI);
    return await fetch(url)
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }
);

//  using axios
// export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
//
// try {
//   const resp = await axios(url);
//   return resp.data;
// } catch (error) {}

//   });

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      //   console.log(payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },

  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
  // new feature to use async thnk
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementBy, (state, action) => {
  //         // action is inferred correctly here if using TS
  //       })
  //       // You can chain calls, or have separate `builder.addCase()` lines each time
  //       .addCase(decrement, (state, action) => {})
  //       // You can match a range of action types
  //       .addMatcher(
  //         isRejectedAction,
  //         // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
  //         (state, action) => {}
  //       )
  //       // and provide a default case if no other handlers matched
  //       .addDefaultCase((state, action) => {})
  //   },
});

// console.log(cartSlice.actions.increase);

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
