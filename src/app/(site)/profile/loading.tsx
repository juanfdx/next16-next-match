import { Spinner } from '@heroui/react';


export default async function loading() {
  
  return (
    <div className='relative h-127.75'>
      {/* text transparent */}
      <h1 className='text-xl font-semibold text-center text-transparent uppercase py-2 bg-linear-to-r from-purple-500 to-pink-500'>
        Profile
      </h1>
      <div className='absolute inset-0 flex items-center justify-center'>
        <Spinner className='w-20 h-20 text-pink-500'  />
      </div>
    </div>
  );
}