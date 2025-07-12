import React from 'react'
import Image from 'next/image'

const Order = () => {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">FITSLY</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #44821</h1>
              <p className="leading-relaxed mb-4">Your order has been successfully placed!</p>

              <div className="mb-6">

                {/* Table Headers */}
                <div className="grid grid-cols-3 border-b border-gray-300 py-2 font-semibold text-gray-700 text-sm md:text-base">
                  <span>Product</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Price ($)</span>
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-3 border-b border-gray-200 py-2">
                  <span className="text-gray-600">Wear-the-code XL / Black</span>
                  <span className="text-center text-gray-900">1</span>
                  <span className="text-right text-gray-900">499</span>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 border-b border-gray-200 py-2">
                  <span className="text-gray-600">Wear-the-code XL / Black</span>
                  <span className="text-center text-gray-900">1</span>
                  <span className="text-right text-gray-900">499</span>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-3 border-b border-gray-200 py-2">
                  <span className="text-gray-600">Wear-the-code Small / Blue</span>
                  <span className="text-center text-gray-900">1</span>
                  <span className="text-right text-gray-900">399</span>
                </div>
              </div>


              <div className="flex flex-col">
                <span className="title-font font-medium text-2xl text-gray-900">SubTotal: $58.00</span>
                <div className='my-2'>
                  <button className="flex mx-0 my-2 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>

                </div>
              </div>
            </div>
            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src='https://m.media-amazon.com/images/I/61C+zURu0EL._AC_SX522_.jpg'></img>
          </div>
          
        </div>
      </section>
    </div>
  )
}

export default Order
