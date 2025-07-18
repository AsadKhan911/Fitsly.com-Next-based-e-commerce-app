"use client";

import React, { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TiShoppingCart } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from "react-icons/md";
import { CartContext } from '../layout.js'

const Navbar = () => {

    const { logout, user, cart, clearCart, removeFromCart, addToCart } = useContext(CartContext);
    const [dropdown, setDropdown] = useState(false)

    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-[100%]')) {
            ref.current.classList.remove('translate-x-[100%]');
            ref.current.classList.add('translate-x-[0%]');
        } else {
            ref.current.classList.remove('translate-x-[0%]');
            ref.current.classList.add('translate-x-[100%]');
        }
    };

    const toggleDropDown = () => {
        setDropdown(!dropdown)
    }

    const ref = useRef()

    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-between items-center py-2 shadow-xl sticky top-0 bg-white z-10 '>
            <div className="logo md:mx-5 mr-auto">
                <Link href={'/'}><Image width={200} height={40} src='/images/logo.png' alt='' /></Link>
            </div>
            <div className="nav">
                <ul className="flex items-center space-x-6 font-bold md:text-xl">
                    <Link href={'/tshirts'}><li>Tshirts</li></Link>
                    <Link href={'/hoodies'}><li>Hoodies</li></Link>
                    <Link href={'/stickers'}><li>Stickers</li></Link>
                    <Link href={'/mugs'}><li>Mugs</li></Link>
                </ul>
            </div>
            <div className="cart absolute items-center right-0 top-4 mx-5 flex">
                <div onMouseOver={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className="relative">
                    {dropdown && (
                        <div
                            onMouseOver={() => setDropdown(true)}
                            onMouseLeave={() => setDropdown(false)}
                            className="absolute right-0 top-9 bg-pink-300 shadow-lg rounded-xl w-44 z-50 overflow-hidden transition-all duration-200"
                        >
                            <ul className="flex flex-col divide-y divide-pink-200">
                                <li className="hover:bg-pink-100 text-sm text-gray-800">
                                    <Link href="/myaccount" className="block px-4 py-2 hover:text-pink-700 transition-colors">My Account</Link>
                                </li>
                                <li className="hover:bg-pink-100 text-sm text-gray-800">
                                    <Link href="/orders" className="block px-4 py-2 hover:text-pink-700 transition-colors">Orders</Link>
                                </li>
                                <li className="hover:bg-pink-100 text-sm text-gray-800">
                                    <Link href="/login">
                                        <span onClick={logout} className="block px-4 py-2 hover:text-pink-700 transition-colors cursor-pointer">
                                            Logout
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    {user.value && (
                        <MdAccountCircle className="text-xl md:text-4xl cursor-pointer text-pink-600 hover:text-pink-700 transition" />
                    )}
                </div>


                {!user.value && <Link href={'/login'}>
                    <button className='bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2'>Login</button>
                </Link>}

                <button onClick={toggleCart}>
                    <TiShoppingCart className='mx-1 text-xl md:text-4xl cursor-pointer' />
                </button>
            </div>


            <div ref={ref} className={`w-72 h-[100vh] sidebar overflow-y-scroll absolute right-0 top-0 bg-pink-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? ' translate-x-0' : ' translate-x-full'}`}>
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className='absolute top-4 right-4 cursor-pointer'><IoClose className='text-2xl' /></span>
                <ol className='list-decimal font-semibold'>

                    {Object.keys(cart).length == 0 &&
                        <div className='my-4 font-semibold text-center'>No items in the cart</div>}

                    {Object.keys(cart).map((k) => {
                        return (
                            <li key={k}>
                                <div className="item flex my-5">
                                    <div className="w-2/3 font-semibold">
                                        {cart[k].name} ({cart[k].size}/{cart[k].variant})
                                    </div>
                                    <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                                        <AiFillMinusCircle
                                            onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}
                                            className="cursor-pointer text-pink-500" />
                                        <span className="mx-2 text-sm">{cart[k].qty}</span>
                                        <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className="cursor-pointer text-pink-500" />
                                    </div>
                                </div>
                            </li>
                        );
                    })}

                </ol>

                <div className='flex'>
                    <Link href={'/checkout'}><button className="flex mx-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-xl">
                        <BsFillBagCheckFill className='m-0.5 mx-1 text-xl' /> Checkout</button></Link>
                    <button onClick={clearCart} className="flex flex-row mx-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-xl">Clear</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar