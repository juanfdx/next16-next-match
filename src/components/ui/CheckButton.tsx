'use client';

import { useState } from 'react'
// icons
import { FaRegCheckCircle } from 'react-icons/fa';



export const CheckButton = () => {

  const [isChecked, setIsChecked] = useState(false)

  const handleClick = () => {
    setIsChecked(!isChecked)
  }

  return (
    <button 
      className='absolute top-2 left-2 cursor-pointer'
      onClick={handleClick}
    >
      {isChecked ? (
        <FaRegCheckCircle className='w-6 h-6 fill-green-500'  />
      ) : (
        <div className='w-6 h-6 rounded-full border-2 border-gray-300'></div>
      )}

    </button>
  )
}