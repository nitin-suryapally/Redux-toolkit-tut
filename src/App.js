import React from "react";
import Navbar from "./components/Navbar";
import CartCointainer from "./components/CartCointainer";
import { useDispatch , useSelector } from "react-redux";
import { calculateTotals } from "./features/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";
import { getCartItems } from "./features/cartSlice";



function App() {

  const {cartItems, isLoading} = useSelector((store) => store.cart);
  const {isOpen} = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  } , [])

  useEffect(() => {
    dispatch(calculateTotals());
  } , [cartItems])

  if(isLoading){
    return(
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      
      {isOpen &&  <Modal />}
      <Navbar />
      <CartCointainer />
    </main>
  );
}
export default App;
