import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItems } from "../../features/cart/cartSlice";

const Cart = () => {
    const cartItems = useSelector(selectCartItems)
    let totalPrice = 0
    cartItems.forEach(element => {
        totalPrice+= parseFloat(element.price)
    });
    return (
        <div>
            <div className="flex flex-col lg:max-w-7xl max-w-2xl mx-auto mt-5 md:py-12 px-4 lg:px-8 ">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Product Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Quantity
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Price
                            </th>

                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src={item.image} alt="" />
                                    </div>
                                    <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                    </div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <button className="px-2 bg-red-600 text-white">-</button>
                                <button className="px-2 bg-gray-200 text-black">{item.qty}</button>
                                <button className="px-2 bg-green-600 text-white">+</button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">${item.price}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    <img src="https://img.icons8.com/color/30/000000/delete-forever.png" alt="Delete Button" />
                                </a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:max-w-7xl max-w-2xl mx-auto my-5 px-4 lg:px-8 ">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 md:w-1/3 w-full bg-gray-50 space-y-6 ml-auto">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between  w-full">
                            <p className="text-base leading-4 text-gray-800">Subtotal</p>
                            <p className="text-base leading-4 text-gray-600">${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <p className="text-base leading-4 text-gray-800">
                                Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span>
                            </p>
                            <p className="text-base leading-4 text-gray-600">-$0.00</p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <p className="text-base leading-4 text-gray-800">Shipping</p>
                            <p className="text-base leading-4 text-gray-600">$0.00</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                        <p className="text-base font-semibold leading-4 text-gray-600">${totalPrice.toFixed(2)}</p>
                    </div>
                </div>
                <Link to="/checkout" className="ml-auto px-8 py-3 bg-green-600 text-white text-center w-1/3">
                    <a>Checkout</a>
                </Link>
            </div>
        </div>
    );
}

export default Cart;
