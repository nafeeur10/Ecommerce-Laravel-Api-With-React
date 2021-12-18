import React, { useState } from "react";

const products = [
    {
      id: 1,
      name: 'Throwback Hip Bag',
      href: '#',
      color: 'Salmon',
      price: '$90.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Medium Stuff Satchel',
      href: '#',
      color: 'Blue',
      price: '$32.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
  ]

const Checkout = () => {
    const countries = ["China", "Russia", "UK"];
    const [menu, setMenu] = useState(false);
    const [country, setCountry] = useState("United States");

    const changeText = (e) => {
        setMenu(false);
        setCountry(e.target.textContent);
    };

    return (
        <div className="flex justify-center items-center lg:max-w-7xl max-w-2xl mx-auto my-5 md:py-12 px-4 lg:px-8">
            <div className="px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                <div className="flex flex-col justify-start items-start w-full space-y-9">
                    <div className="flex justify-start flex-col items-start space-y-2">
                        <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Checkout</p>
                    </div>

                    <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                        <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
                            <div className="w-full">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li key={product.id} className="py-6 flex">
                                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                        <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="w-full h-full object-center object-cover"
                                        />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col">
                                        <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                            <a href={product.href}>{product.name}</a>
                                            </h3>
                                            <p className="ml-4">{product.price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                        </div>
                                        <div className="flex-1 flex items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty {product.quantity}</p>

                                        <div className="flex">
                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Remove
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
                                ))}
                                </ul>
                            </div>

                            <div className="w-full mt-8 border-t border-gray-200 py-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$262.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                        
                            <div className="mt-8">
                                <input className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="Full Name" />
                            </div>

                            <div className="mt-3">
                                <input className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="Phone Number" />
                            </div>

                            <div className="mt-3">
                                <textarea rows="5" className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="text" placeholder="Full Address"></textarea>
                            </div>

                            <button className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                                <div>
                                    <p className="text-base leading-4">Place Order</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout
