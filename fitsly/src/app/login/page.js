'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  useEffect(()=> {
    if(localStorage.getItem('token'))
    {
      router.push('/')
    }
  } , [])
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token' , data.token)
        toast.success('Login successful!');
        setTimeout(() => {
          router.push('/'); // change to wherever you want
        }, 1500);
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div>
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
      <div className="bg-gray-50">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-[480px] w-full">
            <a href="javascript:void(0)">
              <img src="/images/logo.png" alt="logo" className="w-40 mb-8 mx-auto block" />
            </a>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">Login</h1>
              <form className="mt-12 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="text"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-pink-600"
                      placeholder="Enter user name"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" />
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-pink-600"
                      placeholder="Enter password"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-pink-600 focus:ring-pink-500 border-slate-300 rounded" />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-900">
                      Remember me
                    </label>
                  </div>
                  <Link href={'/forgot'} className='"text-pink-600 hover:underline font-semibold"'>
                    <div className="text-sm">Forgot your password?</div>
                  </Link>
                </div>

                <div className="!mt-12">
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none cursor-pointer"
                  >
                    Login
                  </button>
                </div>
                <p className="text-slate-900 text-sm !mt-6 text-center">
                  Don't have an account?
                  <Link href={'/signup'} className="text-pink-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
