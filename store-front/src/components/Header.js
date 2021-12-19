import { MenuIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/solid'
import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition, Menu } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../features/user/userSlice';
import { useNavigate } from "react-router-dom";
import { selectCartItems } from '../features/cart/cartSlice';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const cartItems = useSelector(selectCartItems)
    const [isAdmin, setIsAdmin] = useState(false)

    const user = useSelector(selectUser)
    const [hasUser, setHasUser] = useState(false)
    const [open, setOpen] = useState(false)
    const [totalCartItems, setTotalCartItems] = useState(0)

    const Logout = () => {
        dispatch(logout())
        navigate("/login", { replace: true });
        setHasUser(false)
    }

    useEffect( () => {
        if(user) { user.id === 1 ? setIsAdmin(true): setIsAdmin(false) }
        setTimeout( () => {
            if(user) setHasUser(true)
            if(cartItems.length > 0) {
                setTotalCartItems(cartItems.length)
            }
            else
            {
                setTotalCartItems(0)
            }
        }, 10)
    }, [user, cartItems])
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

                {!hasUser && <div className="border-t border-gray-200 py-6 px-4 space-y-6">
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
                }
                { hasUser && <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                    <div className="flow-root">
                        <Link to="/login">
                            <a className="-m-2 p-2 block font-medium text-gray-900">
                                My Account
                            </a>
                        </Link>
                    </div>
                </div> }
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
                        { !hasUser && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
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
                        </div>}
                        {
                            hasUser && <Menu as="div" className="relative inline-block text-left">
                            <div>
                              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                My Account
                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                              </Menu.Button>
                            </div>
                      
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <form onSubmit={(e) => Logout(e)}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          type="submit"
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full text-left px-4 py-2 text-sm'
                                          )}
                                        >
                                          Sign out
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </form>
                                  { isAdmin && <Menu.Item>
                                      {({ active }) => (
                                        <Link to="/product/create"
                                        
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full text-left px-4 py-2 text-sm'
                                          )}
                                        >
                                        <a>Create Product</a>
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  }
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        }
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
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalCartItems}</span>
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