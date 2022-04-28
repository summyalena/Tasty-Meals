// we would add dummy meals notes we would use here;
import {useEffect,useState} from 'react'
import classes from "./MealsAvailable.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItems";
import Loader from '../../assests/icons8-dots-loading.gif'

// const DummyMeals = [
//   {
//     id: "m1",
//     name: "sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

// we would render an array of objects to jsx elements
const MealsAvailable = () => {
  // we want to add isLoading 
  const [isLoading, setIsLoading] = useState(true);
  // we want to add a state that shows whether it gives an error or not
  const [httpError, setHttpError] = useState(null)
  const [meals,setMeals] = useState([]);
 useEffect(()=>{
   const fetchMeals = async ()=>{
  const response = await fetch('https://foodorderapp-4fbfc-default-rtdb.firebaseio.com/meals/.json');
 
  // as it's awaiting this data response it can throw an error if there is one and so we have
  if(!response.ok){
    // any string stored here is stored in the message property of catch error
    throw new Error('something must have gone wrong');
  }

  const responseData = await response.json();
  // the responseData is an object and we want an array so we have;
  const loadedMeals = [];



  // we are creating a for- in loop that would go through all the keys in the response data onject
  for (const key in responseData){
    loadedMeals.push(
      {
        // we are adding the id cux we have initialized it in our object and we have to add key because it is the id of the individual key we fetching
        id:key,
        // we want to get the data name from the responseData and assign it the key value and the value name
        name:responseData[key].name,
        description:responseData[key].description,
        price:responseData[key].price
      }
    );
  }
  setMeals(loadedMeals);
  setTimeout(() => {
     setIsLoading(false);
  }, 400);
  // setIsLoading(false);
};

// since we are using an async function we would have to use just the catch function

   fetchMeals().catch((error)=>{
     setIsLoading(false);
     setHttpError(error.message);
   });

}, []);
// we have if it's loading it shows the below text loading
   if(isLoading){
     return (
       <section className={classes.mealsload}><img src={Loader} alt="wait until loads"/></section>
     )
   }
   if(httpError){
    return (
      <section className={classes.mealError}>{httpError}</section>
    )
  }
  
// we now use the meals that was initialized using the useState
  const mealsList = meals.map((meal) => 
//   here we would access the attributes props from Mealitems 
  <MealItem
  id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  );
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;
