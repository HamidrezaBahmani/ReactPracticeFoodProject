//12-now when we wrap our components with our provider
//we can use it here import { useContext } from "react";
import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
//13-we also need to import CartContext not the provider
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  //14-here by using useContext and send CartContext we can access data(we stablished connection)  (goto CartProvider for 15-)
  //when the context changes react will automatically reevalute this component
  const cartCtx = useContext(CartContext);
  //curNumber=total
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
