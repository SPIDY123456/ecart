
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cartItems }) => {
    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            setErrorMessage("Please add some products to your cart before proceeding to checkout.");
            return;
        }

        setErrorMessage('');

        const orderData = {
            user: shippingAddress,
            products: cartItems,
            status: "Ordered",
        };

        localStorage.setItem("orderDetails", JSON.stringify(orderData));
        navigate('/orders');
    };

    const handleCart = () => {
        navigate('/carts');
    }

    return (
        <div className="max-w-2xl  mx-auto my-12 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-semibold font-sans-serif mb-8 text-center text-blue-600">CHECKOUT</h2>

            {errorMessage && (
                <div className="text-red-500 text-center mb-4">{errorMessage}</div>
            )}

            <form className=" max-w-screen-lg space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={shippingAddress.fullName}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Address Line 1</label>
                    <input
                        type="text"
                        name="addressLine1"
                        placeholder="Enter address line 1"
                        value={shippingAddress.addressLine1}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Address Line 2</label>
                    <input
                        type="text"
                        name="addressLine2"
                        placeholder="Enter address line 2 (optional)"
                        value={shippingAddress.addressLine2}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">City</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">State</label>
                    <input
                        type="text"
                        name="state"
                        placeholder="Enter state"
                        value={shippingAddress.state}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="Enter zip code"
                        value={shippingAddress.zipCode}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
            </form>

            <button
                onClick={handleCheckout}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 mt-6 w-full rounded-lg transition-colors"
            >
                Confirm and Checkout
            </button>

            <button
                onClick={handleCart}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold p-3 mt-4 w-full rounded-lg transition-colors"
            >
                View Cart
            </button>
        </div>
    );
};

export default CheckoutPage;
