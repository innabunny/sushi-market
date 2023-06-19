import { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import SubmitOrder from "./SubmitOrder";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isActiveOrderForm, setIsActiveOrderForm] = useState(false);

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

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>

      {isActiveOrderForm && <SubmitOrder onCloseForm={props.onCloseCart} />}

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
    </Modal>
  );
};

export default Cart;
