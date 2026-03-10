import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';


type Props = {
  userImage?: string | null;
};


export const UserIcon = ({ userImage }: Props) => {

  return (
    <>
      {userImage ? (
        <Image
          src={userImage }
          alt="User profile"
          width={24}
          height={24}
          className="w-6 h-6 rounded-full object-cover"
        />
      ) : (
        <FaUserCircle className="w-6 h-6" />
      )}
    </>
  )
}