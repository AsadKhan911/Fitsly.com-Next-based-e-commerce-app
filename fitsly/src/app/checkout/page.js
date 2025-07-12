'use client';

import Link from 'next/link';
import React, { useContext } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { CartContext } from '../layout.js';
import { BsFillBagCheckFill } from 'react-icons/bs';

const Checkout = () => {
  const { cart, subTotal, removeFromCart, addToCart } = useContext(CartContext);

  return (
    <div className="container mx-auto px-4">
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>

      {/* 1. Delivery Details */}
      <h2 className="text-xl font-bold mb-4">1. Delivery Details</h2>
      <div className="grid  grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-sm text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full mt-1 mb-4 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-2 px-3 transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-1 mb-4 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-2 px-3 transition duration-200"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="text-sm text-gray-600">
          Address
        </label>
        <textarea
          id="address"
          rows={3}
          name="address"
          className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-2 px-3 transition duration-200"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="text-sm text-gray-600">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full mt-1 mb-4 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-2 px-3 transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="state" className="text-sm text-gray-600">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full mt-1 mb-4 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-2 px-3 transition duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="pincode" className="text-sm text-gray-600">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="w-full mt-1 mb-4 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-2 px-3 transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="city" className="text-sm text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full mt-1 mb-4 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-2 px-3 transition duration-200"
          />
        </div>
      </div>

      {/* 2. Cart Review */}
      <h2 className="text-xl font-bold mt-10 mb-4">2. Review Cart Items & Pay</h2>
      <div className="bg-pink-100 p-6 rounded-lg shadow-sm mb-6">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold text-center">No items in the cart</div>
          )}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex justify-between my-3 items-center">
                <div>
                  {cart[k].name} ({cart[k].size}/{cart[k].variant})
                </div>
                <div className="flex items-center">
                  <AiFillMinusCircle
                    onClick={() =>
                      removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)
                    }
                    className="cursor-pointer text-pink-500"
                  />
                  <span className="mx-2 text-sm">{cart[k].qty}</span>
                  <AiFillPlusCircle
                    onClick={() =>
                      addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)
                    }
                    className="cursor-pointer text-pink-500"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 text-lg font-bold">Subtotal: ${subTotal}</div>
      </div>

      <div className="text-right">
        <Link href="/checkout">
          <button className="flex items-center justify-center gap-2 text-white bg-pink-500 hover:bg-pink-600 py-2 px-6 rounded text-lg">
            <BsFillBagCheckFill className="text-xl" />
            Pay ${subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
