//12-now when we wrap our components with our provider
//we can use it here import { useContext } from "react";
import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
//13-we also need to import CartContext not the provider
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  //14-here by using useContext and send CartContext we can access data(we stablished connection)  (goto CartProvider for 15-)
  //when the context changes react will automatically reevalute this component
  const cartCtx = useContext(CartContext);
  //curNumber=total
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
