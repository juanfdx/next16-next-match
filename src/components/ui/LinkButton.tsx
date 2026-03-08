import Link from 'next/link'

interface Props {
  href: string
  label: string
}

export const LinkButton = ({ href, label }: Props) => {
  return (
    <Link href={href} className='px-3 pb-0.5 h-9 flex items-center border bg-linear-to-r from-purple-500 to-pink-500 rounded-md text-white border-white hover:text-gray-200 hover:border-gray-300 capitalize'>
      {label}
    </Link>
  )
}