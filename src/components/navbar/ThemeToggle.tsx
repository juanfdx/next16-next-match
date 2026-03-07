"use client";

import { useTheme } from "next-themes";
import { BiMoon, BiSun } from 'react-icons/bi';


export default function ThemeToggle() {
  
  const { theme, setTheme } = useTheme();


  return (
    <button
     className='w-9 h-9 flex justify-center items-center border rounded-md text-white border-white hover:text-gray-200 hover:border-gray-300 capitalize'
      onClick={() => 
        setTheme(theme === "dark" ? "light" : "dark")
       
      }
    >
      {theme === "dark" ? (<BiSun className='w-6 h-6' />) : (<BiMoon className='w-5 h-5' />)}
    </button>
  );
}