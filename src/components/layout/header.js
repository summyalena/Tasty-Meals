import React, { Fragment } from 'react'
import Image from '../../assests/meals.jpg'
import classes from './header.module.css'
import HeaderCartIcon from '../layout/HeaderCartIcon'
function Headers(props){
    return(
        <Fragment>
           <headers className="w-full h-7rem bg-red-800 fixed justify-between text-white overflow-hidden shadow-md  flex items-center px-10 py-2 md:px-20 z-10 ">
               <h1 className="font-bold text-2xl font-inherit">TastyMeals</h1>
               <HeaderCartIcon onClick={props.onshowCart}/>
               
               </headers> 
               <div className={classes['main-image']}>
                   <img src={Image} alt="a table of delicious food"/>
                   </div>
            </Fragment>
    )
}
export default Headers;