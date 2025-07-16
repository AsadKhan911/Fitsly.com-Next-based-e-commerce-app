'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const TShirts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/getproducts', {
          cache: 'no-store',
        })
        const data = await res.json()

        if (data.success) {
          setProducts(data.tshirts)
        }
      } catch (error) {
        console.error('Fetch error:', error)
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
                      {product.size.includes('S') && (
                        <span className="border border-gray-300 px-1 mx-1">S</span>
                      )}
                      {product.size.includes('M') && (
                        <span className="border border-gray-300 px-1 mx-1">M</span>
                      )}
                      {product.size.includes('L') && (
                        <span className="border border-gray-300 px-1 mx-1">L</span>
                      )}
                      {product.size.includes('XL') && (
                        <span className="border border-gray-300 px-1 mx-1">XL</span>
                      )}
                      {product.size.includes('XXL') && (
                        <span className="border border-gray-300 px-1 mx-1">XXL</span>
                      )}
                    </div>

                    {/* ✅ Colors */}
                    <div className="flex justify-center mt-2">
                      {product.color.includes('Red') && (
                        <button className="border border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6"></button>
                      )}
                      {product.color.includes('Blue') && (
                        <button className="border border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6"></button>
                      )}
                      {product.color.includes('Black') && (
                        <button className="border border-gray-300 ml-1 bg-black rounded-full w-6 h-6"></button>
                      )}
                      {product.color.includes('White') && (
                        <button className="border border-gray-300 ml-1 bg-white rounded-full w-6 h-6"></button>
                      )}
                      {product.color.includes('Green') && (
                        <button className="border border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6"></button>
                      )}
                      {product.color.includes('Yellow') && (
                        <button className="border border-gray-300 ml-1 bg-yellow-400 rounded-full w-6 h-6"></button>
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

export default TShirts
