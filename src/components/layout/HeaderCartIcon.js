import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartIcon.module.css'
import CartContext from '../stores/Cart-context'
import {useContext,useState,useEffect} from 'react'

function HeaderCartButton(props){
   const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const Cartx = useContext(CartContext);

    const { items } = Cartx;

    const numberOfCartItems = items.reduce((curNumber, item)=>{
        return curNumber + item.amount  
    },0);
   
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

           useEffect(()=>{
               
               if(items.length === 0){
                   return;
               }
               setBtnIsHighlighted(true);
               const timer = setTimeout(()=>{
                   setBtnIsHighlighted(false);
               }, 300)
               return ()=>{
                   clearTimeout(timer);
               }
           }, [items])

           
        return (
         <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
            </span>
    </button>
    );
}

export default HeaderCartButton;