import React from "react";
import styles from './Header.module.css';
import sushiImg from '../../assets/sushi.jpg';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Японская Кухня</h1>
        <HeaderCartButton />
      </header>
      <div className={styles["main-image"]}>
        <img src={sushiImg} alt="Блюда японской кухни"/>
      </div>

    </React.Fragment>
  )
};

export default Header;