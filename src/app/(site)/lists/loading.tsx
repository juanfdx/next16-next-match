import { Skeleton } from '@heroui/react'


export default function loading() {
  const buttonsCount = 3;
  const buttons = Array.from({ length: buttonsCount }, (_, index) => index);

  const skeletonsCount = 10;
  const skeletons = Array.from({ length: skeletonsCount }, (_, index) => index);


  return (
    <>
      <div className='flex flex-col sm:flex-row gap-2'>
        {buttons.map((button) => (
          <Skeleton key={button} className='w-full sm:w-40 h-9 rounded-md' />
        ))}
        
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skeletons.map((skeleton) => (
          <Skeleton key={skeleton} className='h-[226.81px] rounded-xl' />
        ))}
      </div>
    </>
  );
}