import React, { useState } from "react";
import styles from './Header.module.css';
import sushiImg from '../../assets/sushi.jpg';
import HeaderCartButton from "./HeaderCartButton";
import Cart from "../Cart/Cart";

const Header = (props) => {

  const [cartOpen, setCartOpen] = useState(false);

  const handleCartOpened = () => {
    setCartOpen(true);
  }

  const handleCartClosed = () => {
    setCartOpen(false);
  }

  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Японская Кухня</h1>
        <HeaderCartButton  onCartOpen={handleCartOpened} />
      </header>
      <div className={styles["main-image"]}>
        <img src={sushiImg} alt="Блюда японской кухни"/>
      </div>

      {cartOpen && ( <Cart onCloseCart={handleCartClosed} />)}
    </React.Fragment>
  )
};

export default Header;