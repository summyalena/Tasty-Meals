import MealItemsForm from "./MealItemsForm";
import {useContext} from 'react';
import CartContext from '../../stores/Cart-context'
const MealItem = (props)=>{
    // here we are accessing the cart
    const CartCtx = useContext(CartContext)

    const price = `#${props.price.toFixed(2)}`
    
    const addToCartHandler = amount =>{
       CartCtx.addItem({
           id:props.id,
           name:props.name,
           amount:amount,
           price:props.price
       })
    }
    return (
        <li className="flex justify-between m-2 pb-2 border-b-4 ">
        <div>
          <h3 className="mb-1">
              {props.name}
          </h3>

          <div className="italic font-bold text-indigo-500">
              {props.description}
          </div>

          <div className="mt-1 font-bold text-[#ad5502] text-xl">
              {price}
          </div>

            </div>

            <div>
               <MealItemsForm onAddToCart={addToCartHandler} id={props.id}/>
                </div>
            </li>

    )
}
export default MealItem;