import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  amount: number;
}

interface Items {
  items: CartItem[];
  cartContainerItems: CartItem[];
  totalAmount: number;
  totalPrice: number;
  overallPrice: number,
}

// interface Cart {
//     cartContainerItems: CartItem[],
// }

// const cartItems: Cart = {
//     cartContainerItems: [],
// }

const initialState: Items = {
  items: [
    { id: 101, name: "Phone", price: 100, amount: 0 },
    { id: 102, name: "Book", price: 200, amount: 0 },
    { id: 103, name: "Pen", price: 50, amount: 0 },
    { id: 104, name: "Pencil", price: 250, amount: 0 },
  ],
  cartContainerItems: [],
  totalAmount: 0,
  totalPrice: 0,
  overallPrice: 0,
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const addingItem = state.items.find((item) => item.id === action.payload);
      // const addingItem = state.cartContainerItems.find((item) => item.id === action.payload);
      if (addingItem) {
        // cartItems.cartContainerItems.push(addingItem);
        // state.items.push(addingItem);
        const isItemInCart = state.cartContainerItems.some(
          (cartItem) => cartItem.id === addingItem.id
        );

        if (!isItemInCart) {
          state.cartContainerItems.push(addingItem);
          addingItem.amount = addingItem.amount + 1;
        }
        // console.log(addingItem);
        // console.log(state.items);
        // console.log(state.cartContainerItems);
        cartReducer.caseReducers.calcTotal(state);
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const cartItem = state.cartContainerItems.find((item) => item.id === action.payload);
      if (cartItem) {
        cartItem.amount += 1;
      }
      cartReducer.caseReducers.calcTotal(state);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const cartItem = state.cartContainerItems.find((item) => item.id == action.payload);
      if (cartItem) {
        cartItem.amount -= 1;
        if (cartItem.amount < 1) {
          cartReducer.caseReducers.removeItem(state, action);
        }
      }
      cartReducer.caseReducers.calcTotal(state);
    //   console.log(state.cartContainerItems);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.cartContainerItems = state.cartContainerItems.filter(
        (item) => item.id !== action.payload
      );
      cartReducer.caseReducers.calcTotal(state);
    },
    calcTotal: (state) => {
      // let totalAmount = state.cartContainerItems.length;
      let totalAmount = 0;
      let totalPrice = 0;
      state.cartContainerItems.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.amount * item.price;
      });
      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
    //   state.overallPrice = totalAmount * (state.items.forEach((item) => {
    //     item.price;
    //   }));
    //   let overallPrice = 0;
    //   state.cartContainerItems.forEach((item) => {
    //     overallPrice = 
    //   })
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem } = cartReducer.actions;
export default cartReducer.reducer;
