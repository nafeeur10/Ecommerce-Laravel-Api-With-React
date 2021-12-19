import React, { useEffect, useState } from "react"
import { clearCart, selectCartItems } from "../../features/cart/cartSlice"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewOrder } from "../../features/cart/orderSlice";
import { selectAuthToken } from "../../features/user/userSlice";

const Checkout = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const cartItems = useSelector(selectCartItems)
    const token = useSelector(selectAuthToken)

    const [deliveryName, setDeliveryName] = useState('')
    const [deliveryMobile, setDeliveryMobile] = useState('')
    const [deliveryEmail, setDeliveryEmail] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')

    let totalPrice = 0
    cartItems.forEach(element => {
        totalPrice+= parseFloat(element.price)
    });

    let addressData = {
        delivery_name: deliveryName,
        delivery_mobile: deliveryMobile,
        delivery_email: deliveryEmail,
        delivery_address: deliveryAddress
    }

    let orderPlaceData = {
        cartItems: cartItems,
        delivery: addressData,
        token: token
    }

    const createOrder = (e) => {
        e.preventDefault()
        dispatch(createNewOrder(orderPlaceData))
        dispatch(clearCart())
        navigate("/", { replace: true });
    }

    useEffect( () => {
        if(!cartItems) {
            navigate("/", { replace: true });
            return
        }
    }, [cartItems])

    return (
        <div className="flex justify-center items-center lg:max-w-7xl max-w-2xl mx-auto my-5 md:py-12 px-4 lg:px-8">
            <div className="px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                <div className="flex flex-col justify-start items-start w-full space-y-9">
                    <div className="flex justify-start flex-col items-start space-y-2">
                        <p className="text-3xl lg:text-4xl ml-8 md:ml-0 font-semibold leading-7 lg:leading-9 text-gray-800">Checkout</p>
                    </div>

                    <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-full md:w-1/2">
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
                                    
                                    <button className="px-2 bg-gray-200 text-black">{item.qty}</button>
                                    
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

                            <div className="flex flex-col mx-auto my-5 px-4 lg:px-8 border-t">
                                <div className="flex flex-col px-4 md:px-0 py-6 w-full space-y-6 ml-auto">
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
                            </div>
                        </div>

                        <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                            <form onSubmit={(e) => createOrder(e)}>
                            <p className="text-2xl lg:text-3xl ml-8 md:ml-0 font-semibold leading-7 lg:leading-9 text-gray-800">Delivery Address</p>
                            <div className="mt-8">
                                <input className="border border-gray-300 px-4 py-2 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" 
                                type="text"
                                required
                                placeholder="Full Name"
                                value={deliveryName}
                                onChange={(e) => setDeliveryName(e.target.value)}
                                />
                            </div>

                            
                            <div className="mt-3 flex">
                                <input className="border border-gray-300 px-4 py-2 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600 mr-3" 
                                type="text" 
                                required
                                placeholder="Phone Number" 
                                value={deliveryMobile}
                                onChange={(e) => setDeliveryMobile(e.target.value)}
                                />
                                <input className="border border-gray-300 px-4 py-2 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" 
                                type="email" 
                                placeholder="Email (Optional)" 
                                value={deliveryEmail}
                                onChange={(e) => setDeliveryEmail(e.target.value)}
                                />
                            </div>

                            <div className="mt-3">
                                <textarea rows="5" 
                                className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" 
                                type="text" 
                                required
                                placeholder="Full Address"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                ></textarea>
                            </div>

                            <button className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 text-white flex justify-center items-center py-4 rounded w-full"
                            >
                                <div>
                                    <p className="text-base leading-4">Place Order</p>
                                </div>
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout
