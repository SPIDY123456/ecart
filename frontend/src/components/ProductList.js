import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ addToCart }) => { // Ensure you receive addToCart here
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error.message);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const userId = 'testuser';
        addToCart(product,userId); // Call addToCart without await since it's not a promise
        navigate('/carts'); // Navigate to the cart page
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const homesweet = () => {
        navigate('/'); // Navigate to the home page
    };
        

    return (
        <div>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products"
                    className="border p-2 m-2"
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="border p-4">
                        <h2 className="font-montserrat text-3xl mb-10">{product.title}</h2>
                        <img src={product.image} alt={product.title} className="w-full h-auto mb-5" />
                        <p className="font-bold mb-3">${product.price}</p>
                        <h3 className="text-black font-semibold mb-6 text-[#007185] hover:underline">{product.description}</h3>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-yellow-400 border text-black font-semibold border-transparent rounded-xl p-3"
                        >
                            Add to Cart
                        </button>
                    </div>
                    
                ))}
                <div className='grid place-items-end'>
                    <button
                        onClick={homesweet}
                        className="bg-red-600 border w-24 mr-8 mb-4 hover:bg-red-800 text-white font-semi   bold border-transparent rounded-xl p-3"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
