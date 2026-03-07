import Image from 'next/image';
import { LuUserRound } from "react-icons/lu";
// import { getUserImageAction } from '@/actions/profile/get-user-image';
// import { getSafeImageSrc } from '@/utils/helpers';



export const UserIcon = () => {

  // const userImage = await getUserImageAction();

  if (false) {
  
    return (
      <Image
        src={userImage.image}
        alt="User profile"
        width={24}
        height={24}
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }

  return (
    <LuUserRound className='w-7 h-7 rounded-full text-white border border-white' />
  )
}