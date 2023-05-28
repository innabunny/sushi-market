import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = (props) => {
  const [isButtonaAnimated, setIsButtonAnimated] = useState(false);

  const cartContext = useContext(CartContext);

  const cartItemNumber = cartContext.items.reduce((currentValue, item) => {
    return currentValue + item.amount
  }, 0);

  const buttonClasses = `${styles.button} ${isButtonaAnimated ? styles.bump : ''}`;

  useEffect(() => {
    if(cartContext.items.length === 0) {
      return;
    }
    setIsButtonAnimated(true); 

   const timer = setTimeout(() => {
      setIsButtonAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }

  }, [cartContext.items]);

  return (
    <button className={buttonClasses} onClick={props.onCartOpen}>
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