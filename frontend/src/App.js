import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import AuthForm from "./components/AuthForm";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import Admin from "./components/Admin";
import './App.css';
import AdminDashboard from "./components/AdminDashboard";
import CheckoutPage from "./components/CheckoutPage";
import OrderDetails from "./components/OrderDetails";
import UserSign from "./components/user/user_signin";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);


  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
    }
     

     
    setTotalCost(prevCost => prevCost + product.price);
  };

  const removeFromCart = (productId) => {
    const productToRemove = cartItems.find(item => item.id === productId);
    if (productToRemove) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      setTotalCost(prevCost => prevCost - (productToRemove.price * productToRemove.quantity));
    }
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<RoleSelection />} />
        <Route path='/login' element={<AuthForm isLogin={true} />} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/register' element={<AuthForm isLogin={true} />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/user-sign' element={<UserSign />} />

        {/* Ensure you're passing addToCart correctly */}

        <Route path='/products' element={<ProductList addToCart={addToCart} />} />
        <Route path='/carts' element={<CartPage cartItems={cartItems} 
          setCartItems={setCartItems}
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          addToCart={addToCart}
          removeFromCart={removeFromCart} />} />
        <Route path='/checkout' element={<CheckoutPage cartItems={cartItems} />} />
        <Route path = "/orders"  element={<OrderDetails />} /> 
        


      </Routes>
    </Router>
  );
};

export default App;
