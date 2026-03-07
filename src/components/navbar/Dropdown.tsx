'use client';

import { useEffect, useRef, useState } from 'react';
// components
import { LogoutLink } from './LogoutLink';
import { IoMenu } from 'react-icons/io5';
import { MenuLinks } from './MenuLinks';




export const Dropdown = () => {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  
  return (
    <div ref={dropdownRef} className='relative inline-block text-left'>

      {/* trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)} 
        className='flex justify-center items-center gap-2 px-1  h-9 rounded-lg border text-white border-white hover:text-gray-200 hover:border-gray-300 capitalize'
      >
        <IoMenu className='w-7 h-7' />
      </button>

      {/* dropdown */}
      <div 
        className={`absolute w-40 mt-2 px-4  py-3 flex flex-col gap-1 text-black bg-white rounded-lg border border-gray-300 z-10 ${open ? 'block' : 'hidden'}`}
      >
        <MenuLinks />
        <div className='border-b my-1'></div>
        <LogoutLink />
      </div>

    </div>
  )
}