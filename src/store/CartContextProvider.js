import CartContext from './cart-context';
import { useReducer  } from 'react';

const defaultCartState ={
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; 
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  };
  
  return defaultCartState
}; 

const CartContextProvider = (props) => {
  const [cartState, dispatchCardAction] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = item => {
    dispatchCardAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemHandler = id => {
    dispatchCardAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const cardContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  }

  return (
    <CartContext.Provider value={cardContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;