import CartContext from "./Cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
// this is the reducer function that has the args state and action which is the state of data and action thereof
const CartReducer = (state, action) => {
     
    // adding the action remove
    if(action.type === 'REMOVE'){
        const existingCartIndex = state.items.findIndex((item)=> item.id === action.id)
    //    we want to get the index of the state items(the items in the current state)
        const existingItem = state.items[existingCartIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter((item)=>item.id !== action.id)
        } else{
          const updatedItem = {...existingItem,amount:existingItem.amount - 1}
             updatedItems = [...state.items]
             updatedItems[existingCartIndex] = updatedItem
        }
        // we now return the items and total amount after the whole removal function
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }

   if(action.type === 'CLEAR'){
     return defaultCartState

   }



  //  we add a function that implements the CLEAR redux action


  if (action.type === "ADD") {
    
//    if we want to add to an item that is already in the cart we create an existingCartItem func where we add the new updated Items
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //    this gets the total amount of items per price and amount
    const existingCartItem = state.items[existingCartIndex];

    let updatedItems;
    if (existingCartItem) {
     const updatedItem = { ...existingCartItem,
                       amount:existingCartItem.amount + action.item.amount };
                       updatedItems = [...state.items]
                    updatedItems[existingCartIndex] = updatedItem;
    }
    else{
        updatedItems=state.items.concat(action.item);
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };

  }

  return defaultCartState;
};

const CartProvider = (props) => {
  // we are using the useReducer hook
  const [CartState, dispatchCartAction] = useReducer(
    CartReducer,
    defaultCartState
  );

  const addItemToHandler = (item) => {
    // here we are adding the reducer dispatch fucntion such that it adds items and points to the item in reducer
    // the dispatch function is always an object
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearActionHandler = ()=>{
    dispatchCartAction({type:'CLEAR'})
}
  
  const cartContext = {
    // here we added the state of the reducer and let it access the items. so we access items from the reducer state.
    items: CartState.items,
    totalAmount: CartState.totalAmount,
    addItem: addItemToHandler,
    removeItem: removeItemFromHandler,
    clearCart: clearActionHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
