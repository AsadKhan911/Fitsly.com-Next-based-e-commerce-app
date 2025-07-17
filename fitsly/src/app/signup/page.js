'use client'

import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const router = useRouter()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const text = await res.text()
      console.log('Raw API response:', text)

      const data = JSON.parse(text)

      if (data.success) {
        toast.success("Signup successful, Login to continue!");

        setTimeout(() => {
          router.push('/login');
        }, 2000); // 2-second delay
      }
      else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error('Signup Error:', err)
      alert('Something went wrong. Try again.')
    }
  }

  return (
    <div>
      <div className="bg-gray-50">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-[480px] w-full">
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <a href="javascript:void(0)">
              <img src="/images/logo.png" alt="logo" className="w-40 mb-8 mx-auto block" />
            </a>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">Sign up</h1>

              <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="relative flex items-center">
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-pink-600"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-pink-600"
                    placeholder="Enter email"
                  />
                </div>

                {/* Password */}
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-pink-600"
                    placeholder="Enter password"
                  />
                </div>

                <div className="!mt-12">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none cursor-pointer"
                  >
                    Register
                  </button>
                </div>

                <p className="text-slate-900 text-sm !mt-6 text-center">
                  Already have an account?
                  <Link href="/login" className="text-pink-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup