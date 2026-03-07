'use client';

import { signOut } from "next-auth/react" // THIS is client-safe


export const LogoutLink = () => {

  return (
    <button
      onClick={() => signOut()}
      className='w-full px-2 py-1 cursor-pointer text-left capitalize rounded-lg hover:bg-gray-100' 
    >
      Logout
    </button>
  );
}