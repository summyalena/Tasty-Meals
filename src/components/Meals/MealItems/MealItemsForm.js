import Input from "../../UI/input";
import {useState} from 'react';
import { useRef } from "react";
const MealItemsForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid,setAmountIsValid] = useState(true);
  
  // add a submit event handler that submits data
  const submitHandler = event => {
    event.preventDefault();
    
    // this stores the new amount value generated from the input
    //  the entered value is always a string so we convert it to a number
    const enteredAmount = amountInputRef.current.value;
   
    // this converts a string to a number
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);

      // we want to get the valid data using props and we can't use context because we are only getting an amount and not the whole items of part of it
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className="text-center" onSubmit={submitHandler}>
      {/* go to where we want to receive info from fto implement our refs (ie the input) */}
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
          step: "1",
        }}
      />
      <button className="rounded-xl hover:[#641e0e] hover:border-[#641e03] active:bg-[#641e03] inherit border border-[#8a2b06] px-9 py-2 rounded-2xl font-bold text-white font-bold bg-red-700 cursor-pointer px-3 py-1">
        +Add
      </button>
      {/* this is an error message */}
      {!amountIsValid && <p>Please input a valid amount between 1-5</p>}
    </form>
  );
};
export default MealItemsForm;
