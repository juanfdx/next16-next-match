'use client';

import { toggleLike } from '@/actions/like/toggle-like';
import { useRouter } from 'next/navigation'
import { IoHeart, IoHeartOutline } from 'react-icons/io5';



type Props = {
  targetId: string
  isLiked: boolean
}


export const LikeButton = ({targetId, isLiked}: Props) => {

  const router = useRouter()
  
  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();   // prevents Link navigation
    e.stopPropagation();  // stops bubbling to parent

    await toggleLike(targetId, isLiked);
    router.refresh();
  };


  
  return (
    <button 
      className='absolute top-2 right-2 group cursor-pointer' 
      onClick={handleLike}
    >
      {isLiked ? (
        <IoHeart className='w-6 h-6 text-red-500' />
      ) : (
        <IoHeartOutline className='w-6 h-6 group-hover:text-red-500 transition-colors' />
      )}
    </button>
  )
}