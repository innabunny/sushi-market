import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = (props) => {

  const cartContext = useContext(CartContext);

  const cartItemNumber = cartContext.items.reduce((currentValue, item) => {
    return currentValue + item.amount
  }, 0);

  return (
    <button className={styles.button} onClick={props.onCartOpen}>
      <span className={styles.icon}>
        <CartIcon />
        </span>
      <span>Корзина</span>
      <span className={styles.badge}>
        {cartItemNumber}
      </span>
    </button>
  )
}

export default HeaderCartButton;