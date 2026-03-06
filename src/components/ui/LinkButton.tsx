import Link from 'next/link'

interface Props {
  href: string
  label: string
}

export const LinkButton = ({ href, label }: Props) => {
  return (
    <Link href={href} className='px-3 pb-0.5 h-9 flex items-center border rounded-md text-white border-white hover:text-gray-200 hover:border-gray-300 capitalize'>
      {label}
    </Link>
  )
}