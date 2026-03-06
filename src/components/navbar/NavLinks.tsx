'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
// utils
import { navLinks } from '@/utils/links'



export const NavLinks = () => {

  const pathname = usePathname();

  return (
    <div className='flex justify-center gap-3'>
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link 
          key={link.href} 
          href={link.href} 
          className={`font-semibold hover:text-gray-200 uppercase ${isActive ? 'text-yellow-400' : 'text-white'}`}
        >
          {link.label}
        </Link>
        )
      })}
    </div>
  )
}