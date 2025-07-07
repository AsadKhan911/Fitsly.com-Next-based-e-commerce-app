import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'

const page = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Image src={'../../../public/images/home.webp'} />
      </div>
      <Footer />
    </div>
  )
}

export default page
