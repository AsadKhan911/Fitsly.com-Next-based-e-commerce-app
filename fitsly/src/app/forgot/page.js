import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Forgot = () => {

  const router = useRouter()

  useEffect(()=> {
        if(localStorage.getItem('token'))
        {
          router.push('/')
        }
      } , [])

  return (
     <div>
          <div className="bg-gray-50">
          <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-[480px] w-full">
              <a href="javascript:void(0)"><img
                src="/images/logo.png" alt="logo" className="w-40 mb-8 mx-auto block" />
              </a>
    
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h1 className="text-slate-900 text-center text-3xl font-semibold">Recover Password</h1>
                <form className="mt-12 space-y-6">
                  
                  <div>
                    <div className="relative flex items-center">
                      <input name="email" type="email" required className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-pink-600" placeholder="Enter your email" />
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                      </svg>
                    </div>
                  </div>
    
                  <div className="!mt-12">
                    <button type="button" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none cursor-pointer">
                     Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
  )
}

export default Forgot