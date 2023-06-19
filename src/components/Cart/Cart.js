import React from "react";
import { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import SubmitOrder from "./SubmitOrder";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isActiveOrderForm, setIsActiveOrderForm] = useState(false);
  const [isDataSubmitting, setIsDataSubmitting] = useState();
  const [wasDataSendingSuccessful, setWasDataSuccessful] = useState(false);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsActiveOrderForm(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsDataSubmitting(true);
    try {
      const response = await fetch(
        "https://my-project-2bad7-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            oredredMeals: cartContext.items,
          }),
        }
      );

      console.log(response.status);
    } catch (err) {
      console.log(err);
    }
    setIsDataSubmitting(false);
    setWasDataSuccessful(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>

      {isActiveOrderForm && (
        <SubmitOrder
          onCloseForm={props.onCloseCart}
          onSubmit={submitOrderHandler}
        />
      )}

      {!isActiveOrderForm && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onCloseCart}>
            Закрыть
          </button>
          {hasItems && (
            <button className={styles.button} onClick={orderHandler}>
              Заказать
            </button>
          )}
        </div>
      )}
    </>
  );

  const dataSubmettingCartModalContent = (
    <p className={styles.submitText}>Отправка данных заказа</p>
  );
  const dataWasSubmetedCartModalContent = (
    <React.Fragment>
      <p className={styles.submitText}>Ваш заказ успешно отправлен</p>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseCart}>
          Закрыть
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isDataSubmitting && !wasDataSendingSuccessful && cartModalContent}
      {isDataSubmitting && dataSubmettingCartModalContent}
      {wasDataSendingSuccessful && dataWasSubmetedCartModalContent}
    </Modal>
  );
};

export default Cart;
