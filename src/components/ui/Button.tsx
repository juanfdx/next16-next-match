
type Props = {
  label: string
  variant?: 'solid' | 'outline'
  active?: boolean
  onClick?: () => void
}


export const Button = ({label, variant = 'solid', active = false, onClick }: Props) => {
  return (
    <button 
      className={`px-3 pb-0.5 h-9 flex justify-center items-center font-semibold capitalize rounded-md ${active ? 'text-yellow-400' : ''} ${variant === 'solid' ? ' text-white bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600' : 'text-pink-600  border-2 border-pink-500 hover:border-pink-400 hover:text-pink-500'} `}
      onClick={ onClick }
    >
     {label}
    </button>
  )
}