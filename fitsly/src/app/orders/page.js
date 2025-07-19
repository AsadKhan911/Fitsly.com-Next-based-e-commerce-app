'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Orders = () => {

  const router = useRouter()

   useEffect(()=> {
      if(!localStorage.getItem('token'))
      {
        router.push('/login')
      }
    } , [])

  return (
    <div>
      <div className='container mx-auto'>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <h1 className='font-bold p-8 text-center text-2xl'>My Orders</h1>
                <table
                  className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                  <thead
                    className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">First</th>
                      <th scope="col" className="px-6 py-4">Last</th>
                      <th scope="col" className="px-6 py-4">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                      <td className="whitespace-nowrap px-6 py-4">Mark</td>
                      <td className="whitespace-nowrap px-6 py-4">Otto</td>
                      <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                      <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                      <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                      <td className="whitespace-nowrap px-6 py-4">@fat</td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                      <td className="whitespace-nowrap px-6 py-4">Larry</td>
                      <td className="whitespace-nowrap px-6 py-4">Wild</td>
                      <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
