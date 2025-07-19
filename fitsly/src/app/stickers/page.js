'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Stickers = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/getproducts', {
          cache: 'no-store',
        })
        const data = await res.json()

        if (data.success) {
          // Filter only stickers category
          const stickerProducts = data.products.filter(
            (product) => product.category.toLowerCase() === 'stickers'
          )
          setProducts(stickerProducts)
        }
      } catch (error) {
        console.error('Fetch error:' , error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.length > 0 ? (
              products.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug}`}
                  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg cursor-pointer m-5"
                >
                  <div className="relative rounded overflow-hidden">
                    <img
                      alt={product.title}
                      className="m-auto h-[30vh] md:h-[36vh] object-contain"
                      src={product.img}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {product.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.title}
                    </h2>
                    <p className="mt-1">${product.price}</p>

                    {/* ✅ Sizes */}
                    <div className="mt-2">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((size) =>
                        product.size.includes(size) ? (
                          <span
                            key={size}
                            className="border border-gray-300 px-1 mx-1"
                          >
                            {size}
                          </span>
                        ) : null
                      )}
                    </div>

                    {/* ✅ Colors */}
                    <div className="flex justify-center mt-2">
                      {['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow'].map(
                        (color) =>
                          product.color.includes(color) && (
                            <button
                              key={color}
                              className={`border border-gray-300 ml-1 rounded-full w-6 h-6 ${
                                color === 'White'
                                  ? 'bg-white'
                                  : color === 'Black'
                                  ? 'bg-black'
                                  : `bg-${color.toLowerCase()}-700`
                              }`}
                            ></button>
                          )
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Stickers
