import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// to check if the input is empty and postalcode is 5char long
const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState({
      name:true,
      street:true,
      postalCode:true,
      city:true
  })
//   a function called when you want to submit
  const Confirm = (event) => {
    event.preventDefault();
    // this has the value of the data inputed
    const nameEntered = nameInputRef.current.value;
    const streetEntered = streetInputRef.current.value;
    const postalCodeEntered = postalCodeInputRef.current.value;
    const cityEntered = cityInputRef.current.value;

    //    we are now adding the formValidity using isEmpty and isFiveChar functions
    const NameInputValid = !isEmpty(nameEntered);
    const StreetInputValid = !isEmpty(streetEntered);
    const PostalCodeInputValid = isFiveChar(postalCodeEntered);
    const CityInputValid = !isEmpty(cityEntered);


    // we set the new state of isFormValid from the form validity inputs
    setFormIsValid({
        name:NameInputValid,
        street:StreetInputValid,
        postalCode: PostalCodeInputValid,
        city:CityInputValid 
    })  


    // checking the whole form validity
    const formValidity =
      NameInputValid && 
      StreetInputValid && 
      PostalCodeInputValid &&
      CityInputValid;


      if(!formValidity){
          return;
        
      }
    //   if it is valid then submit the form
    props.onConfirmOrder({
        name:nameEntered,
        street:streetEntered,
        postalCode:postalCodeEntered,
        city:cityEntered
    })
  };
    // adding the props

  

//   styling the input error
const nameControlClass = `${classes.control} ${formIsValid.name ? '' : classes.invalid}`
const streetControlClass = `${classes.control} ${formIsValid.street ? '' : classes.invalid}`
const postalCodeControlClass = `${classes.control} ${formIsValid.postalCode ? '' : classes.invalid}`
const cityControlClass = `${classes.control} ${formIsValid.city ? '' : classes.invalid}`



  return (
    <div>
      <form className={classes.form} onSubmit={Confirm}>
        <div className={nameControlClass}>
          <label htmlForm="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
        {!formIsValid.name && <p>Please enter a name</p>}
        </div>
        <div className={streetControlClass}>
          <label htmlForm="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formIsValid.street && <p>Please enter a street Address</p>}
        </div>
        <div className={postalCodeControlClass}>
          <label htmlForm="postal code">Postal Code</label>
          <input type="text" id="postal code" ref={postalCodeInputRef} />
          {!formIsValid.postalCode && <p>Please enter a postalCode(5 characters long)</p>}
        </div>
        <div className={cityControlClass}>
          <label htmlForm="city">City</label>
          <input ref={cityInputRef} type="text" id="city" />
          {!formIsValid.city && <p>Please enter a city</p>}
        </div>
        <div className={classes.actions}>
        <button onClick={props.onClose} type="button">
          Cancel
        </button>
        <button className={classes.submit}> Confirm</button>
       </div>
      </form>
    </div>
  );
};

export default Checkout;
