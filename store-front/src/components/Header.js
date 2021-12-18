import { MenuIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

const Header = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-white">
            <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                    <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                    >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                    <div className="flow-root">
                    <Link to="/login">
                    <a className="-m-2 p-2 block font-medium text-gray-900">
                        Sign in
                    </a>
                    </Link>
                    </div>
                    <div className="flow-root">
                    <Link to="/register">
                    <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                        Create account
                    </a>
                    </Link>
                    </div>
                </div>
                </div>
            </Transition.Child>
            </Dialog>
            </Transition.Root>
            <header className="relative bg-white">
                <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <div className="h-16 flex items-center">
                    <button
                        type="button"
                        className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                        onClick={() => setOpen(true)}
                    >
                        <span className="sr-only">Open menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Logo */}
                    <div className="ml-4 flex lg:ml-0">
                        <Link to="/">
                            <a className="flex">
                                <span className="sr-only">weDevs Dokan</span>
                                <img src="https://img.icons8.com/color/48/000000/stall.png"/>
                            </a>
                        </Link>
                    </div>

                

                    <div className="ml-auto flex items-center">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Link to="/login">
                            <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                Log in
                            </a>
                        </Link>
                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                        <Link to="/register">
                        <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            Create account
                        </a>
                        </Link>
                        </div>

                        {/* Search */}
                        <div className="flex lg:ml-6">
                        <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Search</span>
                            <SearchIcon className="w-6 h-6" aria-hidden="true" />
                        </a>
                        </div>

                        {/* Cart */}
                        <div className="ml-4 flow-root lg:ml-6">
                            <Link to="/cart">
                                <a href="#" className="group -m-2 p-2 flex items-center">
                                    <ShoppingBagIcon
                                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
            </header>
        </div>
    )
}

export default Header