//5-make CartProvider.js beside cart-context
//The Goal of this component is simply to manage the CartContext data
//and provide that Context to all components that want to access to it.

//15-now we should manage sate which is more compelex
//so use reducer
import { useReducer } from "react";
//7-import CartContext from "./cart-context"
import CartContext from "./cart-context";

//17-
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//16-cartReducer should be outside CartProvider component since it won't need anything from it
// action will be dispatch in our code
const cartReducer = (state, action) => {
  //21 here we can check dispached action and update state(End)
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amoun;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};
//6-Create CartProvider
//const CartProvider = (props) => {
//   return (
//     <CartContext.Provider >
//       {props.children}
//     </CartContext.Provider>
//   );
// };
const CartProvider = (props) => {
  //18-useReducer
  //cartState =>StateSnapShot
  //dispatchCartAction=>allows you to dispatch an action
  //cartReducer is funct that always can set cartState
  const [cartState, dispatchCartAction] = useReducer(
    //point to our funct
    cartReducer,
    //initialState
    defaultCartState
  );
  //9-declare function that use in helper obj
  // const addItemToCartHandler = (item) => { };
  // const removeItemFromCartHandler = (id) => {};
  const addItemToCartHandler = (item) => {
    //20-now we can also dispach Action
    //foreard item to reducer
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  //8-create helper cartContext obj this is actully update over time
  const cartContext = {
    //19-now we can set dynamic data use latest snapshot of state=>cartState
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  //10-now set this cartContext as value for <CartContext.Provider value={cartContext}> goto(App.js for 11-)
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
