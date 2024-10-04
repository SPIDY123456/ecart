import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CartPage = ({ addToCart, cartItems, totalCost, setCartItems, setTotalCost }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const navigate = useNavigate();








  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        setRecommendedProducts(products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);


  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        // Update the item quantity
        const priceDifference = (newQuantity - item.quantity) * item.price;
        setTotalCost(prevCost => prevCost + priceDifference);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const removeFromCart = (productId) => {
    const productToRemove = cartItems.find(item => item.id === productId);

    if (productToRemove) {
      const newTotalCost = totalCost - (productToRemove.price * productToRemove.quantity);

      // Remove the product from the cart
      setCartItems(prevItems => {
        const updatedItems = prevItems.filter(item => item.id !== productId);
        // If the cart is empty, reset totalCost to 0
        if (updatedItems.length === 0) {
          setTotalCost(0); // Reset total cost
        }
        return updatedItems;
      });

      // Update total cost only if cart is not empty
      if (cartItems.length > 1) {
        setTotalCost(newTotalCost);
      }
    }
  };

  const handleCheckout = () => {
    
    navigate('/checkout'); 
  };

  const handleProducts = () => {
    navigate('/products');

  };


  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);



 

  return (
    <div className="max-w-screen-xl mx-auto">
      <h5 className='text-3xl '>Shopping Cart</h5>
      <h1 className='text-md text-right mr-8'>Price</h1>
   

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className='flex justify-between border-b p-4 mb-4'>
            <div>
              <h2 className="font-semibold text-xl ml-36">{item.title}</h2>
              <img src={item.image} alt={item.title} className="w-34 h-32 object-cover" />
            
              <select
                id={`quantity-${item.id}`}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                className="p-1 border rounded ml-36 bg-gray-100"
              >
                {[1, 2, 3,4,5,6,7,8,9,'10+'].map((option, idx) => (
                  <option key={idx} value={option === '10+' ? 10 : option}>
                    {`Qty:    ${option === '10+' ? '10+' : option}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold mb-10">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded mt-2 hover:bg-red-700"
                onClick={() => removeFromCart(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <h3 className="font-semibold text-xl  text-right mb-24">Subtotal ({totalItems} {totalItems > 1 ? 'items' : 'item'}): ${totalCost}</h3>

      <div className='grid place-items-center mb-12'>
      <button
        className=" bg-yellow-400 border text-black  font-semibold border-transparent rounded-xl hover:border-blue-900 p-3"
        onClick={handleCheckout}
      >
        Proceed to Checkout ({totalItems} {totalItems > 1 ? 'items' : 'item'})
      </button>
      </div>

      <div className='grid place-items-end'>
      <button
        className=" bg-green-400 border items-center text-black  font-semibold border-transparent rounded-xl hover:border-blue-900 p-3"
        onClick={handleProducts}
      >
       Products
      </button>
      </div>

      {recommendedProducts.length > 0 && (
        <div className="mt-8">
          <h5 className='text-3xl mb-4'>You might also like</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendedProducts.map(product => (
              <div key={product.id} className="border p-4 rounded-lg transition-transform duration-300 transform hover:scale-105">
                <h2 className="text-xl font-bold mb-6">{product.title}</h2>
                <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-2" />
                <p className="font-bold font-sans-serif text-lg mb-2">${product.price}</p>
                <p className=" text-blue-500 hover:underline mb-4">{product.description}</p>
                <button className="bg-yellow-400  font-semibold border-transparent rounded-2xl hover:border-blue-700 p-3"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
