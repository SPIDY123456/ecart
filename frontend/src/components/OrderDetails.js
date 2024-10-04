import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
    const [orderData, setOrderData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedOrderData = localStorage.getItem("orderDetails");
        if (storedOrderData) {
            setOrderData(JSON.parse(storedOrderData));
        }
    }, []);

    const steps = [
        { label: "Ordered", date: "2024-10-03", status: "completed" },
        { label: "Shipped", date: "2024-10-04", status: "completed" },
        { label: "Out for delivery", date: "2024-10-05", status: "current" },
        { label: "Delivered", date: "2024-10-06", status: "pending" },
    ];

    if (!orderData) {
        return <div>Loading...</div>;
    }

    // Update delivery status based on orderData
    if (orderData.status === "Delivered") {
        steps[3].status = "completed"; // Mark as completed
        steps[3].date = new Date().toLocaleDateString(); // Update delivery date
    }

    const gotToHome = () => {
        navigate('/');
    }

    return (
        <div className="max-w-screen-lg mx-auto my-12  p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold text-blue-400 text-center mb-24">Order Details</h2>

            <div className="relative ">
                <div className="border-l-4 border-blue-600 absolute h-1/4 "></div>
                <ul className="space-y-6 ">
                    {steps.map((step, index) => (
                        <li key={index} className="relative pl-4 ">
                            <div
                                className={`absolute w-4 h-4 -left-1.5 top-0  rounded-full  ${step.status === "completed"
                                    ? "bg-green-500"
                                    : step.status === "current"
                                        ? "bg-yellow-500"
                                        : "bg-gray-400"
                                    }`}
                            ></div>
                            <div className="flex justify-between items-center mb-12">
                                <span
                                    className={`${step.status === "completed"
                                        ? "text-green-600 -mt-2"
                                        : step.status === "current"
                                            ? "text-yellow-500 -mt-2"
                                            : "text-gray-500 -mt-2"
                                        } text-lg font-medium `}
                                >
                                    {step.label}
                                </span>
                                <span className="text-gray-500 ">{step.date}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-12">Shipping Address</h3>
                    <p><strong>Name:</strong> {orderData.user.fullName}</p>
                    <p><strong>Address Line 1:</strong> {orderData.user.addressLine1}</p>
                    <p><strong>Address Line 2:</strong> {orderData.user.addressLine2}</p>
                    <p><strong>City:</strong> {orderData.user.city}</p>
                    <p><strong>State:</strong> {orderData.user.state}</p>
                    <p><strong>Zip Code:</strong> {orderData.user.zipCode}</p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-8">Products</h3>
                    <ul className="space-y-2 ">
                        {orderData.products.map((product, index) => (
                            <li key={index} className="border p-4 rounded">
                                <p><strong>Product:</strong> {product.title}</p>
                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {orderData.status === "Delivered" && (
                    <div className="mt-4 text-green-500">
                        <h3 className="text-lg font-semibold ">Your product is delivered!</h3>
                    </div>
                )}

                <div className="flex justify-center mb-72">
                    <button className="bg-purple-500 w-24 hover:bg-green-600 text-black rounded-xl p-2 mx-2 mb-4" onClick={gotToHome}>
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
