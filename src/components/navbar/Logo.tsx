import Link from 'next/link';
// components
import { GiMatchTip } from 'react-icons/gi';


export const Logo = () => {
  
  return (
    <Link href='/' className='flex justify-center items-center gap-1'>

      <GiMatchTip className='w-8 h-8' color='white' />

      <div className='hidden md:flex text-3xl font-semibold mb-1'>
        <span className='text-gray-900'>Next</span>
        <span className='text-gray-200'>Match</span>
      </div>

    </Link>
  );
}