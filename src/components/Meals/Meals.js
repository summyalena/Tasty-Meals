import MealsAvailable from './MealsAvailable'
import MealsSummary from './MealsSummary'
import { Fragment } from 'react';

const Meals = ()=>{
    return(
        <Fragment>
        <MealsSummary/>
        <MealsAvailable/>
        </Fragment>
    );
}

export default Meals