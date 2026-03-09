'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import type { NavLink } from '@/utils/links';

type Props = {
  isAdminUser: boolean
  links: NavLink[]
  size?: 'sm' | 'md' | 'lg'
}

export const MenuLinks = ({ isAdminUser, links, size = 'md' }: Props) => {

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        // Hide all admin routes for non-admin users
        if (link.href.startsWith('/admin') && !isAdminUser) return null
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${ size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'} px-2 py-1 capitalize rounded-lg hover:bg-gray-100 ${isActive ? 'font-semibold' : ''}`}
          >
            {link.label}
          </Link>
        )
      })}
    </>
  )
}