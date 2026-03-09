import { Spinner } from '@heroui/react';




export default function loading() {
  return (
    <div className='relative h-127.75'>
      <h1 className='text-xl font-semibold text-center text-white uppercase h-11 bg-linear-to-r from-purple-500 to-pink-500'>

      </h1>
      <div className='absolute inset-0 flex items-center justify-center'>
        <Spinner className='w-20 h-20 text-pink-500'  />
      </div>
    </div>
  );
}