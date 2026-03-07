'use client';

import { signOut } from "next-auth/react" // THIS is client-safe


export const LogoutButton = () => { 
  return (
    <button
      onClick={() => signOut()}
      className='px-3 pb-0.5 h-9 flex items-center border rounded-md text-white border-white hover:text-gray-200 hover:border-gray-300 capitalize' 
    >
      Logout
    </button>
  );
}