import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { menuLinks } from '@/utils/links'

type Props = {
  isAdminUser: boolean
}

export const MenuLinks = ({ isAdminUser }: Props) => {

  const pathname = usePathname();

  return (
    <>
      {menuLinks.map((link) => {
        // Hide all admin routes for non-admin users
        if (link.href.startsWith('/admin') && !isAdminUser) return null
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-2 py-1 capitalize rounded-lg hover:bg-gray-100 ${isActive ? 'font-semibold' : ''}`}
          >
            {link.label}
          </Link>
        )
      })}
    </>
  )
}