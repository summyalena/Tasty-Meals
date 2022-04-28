import './App.css';
import Header from './components/layout/header'
import React, {useState} from 'react'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart';

import CartProvider from './components/stores/CartProvider'
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = ()=> {
    setCartIsShown(true)
  }
  const hideCartHandler = ()=>{
    setCartIsShown(false);
  }
  return (
    <div className="App">
        <CartProvider>
          <Header onshowCart={showCartHandler}/>
         {cartIsShown && <Cart onClose={hideCartHandler}/> }
          <main>
          <Meals/>
          </main>
        </CartProvider>


    </div>
  );
}

export default App;
  