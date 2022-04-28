import Modal from '../UI/Modal'
import React, {useContext, useState} from 'react';
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'
import CartContext from '../stores/Cart-context';
const Cart = (props) => {
    // we want to output the cart items
    const [isCheckout,setIsCheckout] = useState(false)
    // we want to add a state such that it would show or be initialized if the form submits
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [didSubmit,setDidSubmit] = useState(false);
    const CartItems = useContext(CartContext)
    // we want to output total amount
    const totalAmount = `#${CartItems.totalAmount.toFixed(2)}`
     const hasItems = CartItems.items.length > 0;
     const addItemHandler = item =>{
       CartItems.addItem({...item,amount:1})
     };
     const removeItemHandler = (id) =>{
       CartItems.removeItem(id);
     };
    //  creating a function that when clicked on we set isCheckout to false;
    const orderHandler = ()=>{
        
          setIsCheckout(true);
        
    }
    const orderSubmitHandler = async (userData)=>{
            // we want to set the submitting to true when call the function  
      setIsSubmitting(true)
      await fetch('https://foodorderapp-4fbfc-default-rtdb.firebaseio.com/orders.json',
       {method:'POST', body:JSON.stringify({
         user:userData,
         orderedItems:CartItems.items
       })
      })
      setIsSubmitting(false);
      setDidSubmit(true);
      CartItems.clearCart()
    }
    // this is  message that shows when it is either submitting or did submit
    const isSubmittingCart = <p>This is submitting</p>
    const isDidSubmit = <React.Fragment> 
      <p>Successfully sent!</p>
      <div className={classes.actions}>
    <button onClick={props.onClose} className={classes['button--alt']}>
    Close
  </button>
  </div> 
  </React.Fragment>

 const cartItems = <ul className={classes['cart-items']}>
      {CartItems.items.map((item)=>(
          <CartItem onRemove={removeItemHandler.bind(null,item.id)} onAdd={addItemHandler.bind(null,item)} key={item.id} price={item.price} amount={item.amount} name={item.name} />
          ))} </ul>

          const modalAction = <div className={classes.actions}>
          <button onClick={props.onClose} className={classes['button--alt']}>
            Close
          </button>  
          {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
      </div>
      const CartDisplay= <React.Fragment>
         {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
        </div>
       {isCheckout && <Checkout onConfirmOrder={orderSubmitHandler}onClose={props.onClose}/>}
       {!isCheckout &&  modalAction}
      </React.Fragment>

      // creating a close button that would show when it shows submitted
  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && CartDisplay}
     {isSubmitting && isSubmittingCart}
     {!isSubmitting && didSubmit && isDidSubmit}
    </Modal>
  );
};

export default Cart;
