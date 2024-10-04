import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedOrderData = localStorage.getItem("orderDetails");
        if (storedOrderData) {
            const parsedData = JSON.parse(storedOrderData);
            // Ensure parsedData is an array
            setOrders(Array.isArray(parsedData) ? parsedData : [parsedData]);
        }
    }, []);

    const handleGoHome = () => {
        navigate("/"); // Navigate to the home page
    };

    const markAsDelivered = (index) => {
        const updatedOrders = [...orders];
        updatedOrders[index].status = "Delivered";

        // Update local storage with the modified orders
        localStorage.setItem("orderDetails", JSON.stringify(updatedOrders));

        // Update the state to reflect the changes
        setOrders(updatedOrders);

        // Notify the admin
        alert(`Order for ${updatedOrders[index].user.fullName} marked as Delivered!`);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 py-10">
            <div className="flex justify-between items-center mb-8 w-full max-w-4xl px-4">
                <h1 className="text-4xl font-bold text-white">User Purchases</h1>
                <button
                    onClick={handleGoHome}
                    className="bg-white text-blue-600 hover:bg-blue-100 transition duration-300 px-4 py-2 rounded-lg shadow-lg"
                >
                    Home
                </button>
            </div>

            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="min-w-full bg-white rounded-lg shadow-lg border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 text-center text-lg font-semibold text-gray-700 py-3">UserName</th>
                            <th className="border border-gray-300 text-center text-lg font-semibold text-gray-700 py-3">Products</th>
                            <th className="border border-gray-300 text-center text-lg font-semibold text-gray-700 py-3">Quantity</th>
                            <th className="border border-gray-300 text-center text-lg font-semibold text-gray-700 py-3">Total Price</th>
                            <th className="border border-gray-300 text-center text-lg font-semibold text-gray-700 py-3">Status</th>
                            <th className="border border-gray-300 text-center text-lg font-semibold text-gray-700 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td className="border border-gray-300 text-center text-gray-500 py-4" colSpan="6">No orders found.</td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition duration-300">
                                    <td className="border border-gray-300 text-center py-4">{order.user.fullName}</td>
                                    <td className="border border-gray-300 text-center py-4">
                                        {order.products.map(product => (
                                            <div key={product.id} className="text-sm">{product.title}</div>
                                        ))}
                                    </td>
                                    <td className="border border-gray-300 text-center py-4">
                                        {order.products.map(product => (
                                            <div key={product.id} className="text-sm">{product.quantity}</div>
                                        ))}
                                    </td>
                                    <td className="border border-gray-300 text-center py-4">
                                        ${order.products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}
                                    </td>
                                    <td className="border border-gray-300 text-center py-4">
                                        <span className={`text-sm font-semibold ${order.status === "Delivered" ? "text-green-600" : order.status === "Shipped" ? "text-yellow-600" : "text-gray-600"}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 text-center py-4">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                            onClick={() => markAsDelivered(index)}
                                            disabled={order.status === "Delivered"}
                                        >
                                            Deliver
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
