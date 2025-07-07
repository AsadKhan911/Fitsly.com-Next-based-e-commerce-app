import React from 'react'

const page = ({ params }) => {

  const {slug} = params;
  return (
    <div>
        <p>The slug is: {slug}</p>
    </div>
  )
}

export default page
