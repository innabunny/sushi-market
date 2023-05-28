import CartContext from './cart-context';
import { useReducer  } from 'react';

const defaultCartState ={
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; 
    
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItem;
    let updatedItems;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;

      } else {
      updatedItem = {
        ...action.item
        }

         updatedItems = state.items.concat(updatedItem);
      }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  };

  return defaultCartState;
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