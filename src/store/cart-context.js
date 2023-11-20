//1-make store folder beside component folder
//2-name it cart-context.js

import React from "react";
const CartContext = React.createContext({
  //3-declare needes variable,array,function
  //these data not use but for auto compeletion
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});
//4-export default CartContext; goto(CartProvider for 5-)
export default CartContext;
