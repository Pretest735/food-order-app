import { useState } from 'react';
import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import CartProvider from './store/cart-provider';

function App() {
  const [isCartShown,setIsCartShown] = useState(false);

  const showCartFunc = () => {
    setIsCartShown(true);
  }

  const closeCartFunc = () => {
    setIsCartShown(false);
  }

  return (
    <CartProvider>
      {isCartShown && <Cart closeCart={closeCartFunc}/>}
      <Header showCart={showCartFunc}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
