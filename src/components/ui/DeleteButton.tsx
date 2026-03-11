'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
// actions
import { deletePhoto } from '@/actions/images/delete-photo';
// icons
import { FaRegTrashCan } from "react-icons/fa6";

type Props = {
  photoId: string;
};


export const DeleteButton = ({ photoId }: Props) => {

  const router = useRouter();

  const handleClick = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this photo?");
    if (!confirmDelete) return;

    try {
      const response = await deletePhoto(photoId);

      if (!response.success) {
        toast.error(response.error ?? "Something went wrong");
        return;
      } 

      toast.success("Photo deleted successfully");
      router.refresh(); // refresh the page to remove the photo from gallery

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };



  return (
    <button 
      className='absolute top-2 right-2 cursor-pointer'
      onClick={handleClick}
    >
      <FaRegTrashCan className='w-5.5 h-5.5 fill-red-400' />

    </button>
  )
}