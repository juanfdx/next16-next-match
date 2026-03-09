import Link from 'next/link'

interface Props {
  href: string
  label: string
  variant?: 'solid' | 'outline'
}

export const LinkButton = ({ href, label, variant = 'solid' }: Props) => {
  return (
    <Link 
      href={href} 
      className={`px-3 pb-0.5 h-9 flex justify-center items-center font-semibold  capitalize rounded-md ${variant === 'solid' ? ' text-white bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600' : 'text-pink-600 bg-white border-2 border-pink-500 hover:border-pink-400 hover:text-pink-500'} `}
    >
      {label}
    </Link>
  )
}