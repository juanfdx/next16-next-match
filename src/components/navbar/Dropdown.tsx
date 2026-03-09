'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
// utils
import { menuLinks } from '@/utils/links';
// components
import { LogoutLink } from './LogoutLink';
import { IoMenu } from 'react-icons/io5';
import { MenuLinks } from './MenuLinks';
import { UserIcon } from './UserIcon';


type Props = {
  isAdminUser: boolean;
  isLoggedIn: boolean;
  userImage?: string | null;
}

export const Dropdown = ({ isAdminUser, isLoggedIn, userImage }: Props) => {

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
        className='flex justify-center items-center gap-2 px-2 h-9 rounded-lg border text-white border-white hover:text-gray-200 hover:border-gray-300 capitalize'
      >
        <IoMenu className='w-6 h-6' />
        <UserIcon userImage={userImage} />
      </button>

      {/* dropdown */}
      <div 
        className={`absolute w-40 mt-2 px-4  py-3 flex flex-col gap-1 text-black bg-white rounded-lg border border-gray-300 z-10 ${open ? 'block' : 'hidden'}`}
      >
        {!isLoggedIn ? (
          <>
            <Link href="/auth/login" className='px-2 py-1 capitalize rounded-lg hover:bg-gray-100'>
              Login
            </Link>
            <Link href="/auth/register" className='px-2 py-1 capitalize rounded-lg hover:bg-gray-100'>
              Register
            </Link>
          </>
        ) : (    
          <>
            <MenuLinks isAdminUser={isAdminUser} links={menuLinks} />
            <div className='border-b my-1'></div>
            <LogoutLink />
          </>
        )}
      </div>

    </div>
  )
}