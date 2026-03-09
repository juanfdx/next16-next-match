import { Skeleton } from '@heroui/react'


export default function loading() {
  
  const count = 10;
  const skeletons = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {skeletons.map((skeleton) => (
        <Skeleton key={skeleton} className='w-44.5 h-[226.81px] rounded-xl' />
      ))}
    </div>
  );
}