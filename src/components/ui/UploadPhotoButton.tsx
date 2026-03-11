'use client'

import { useRouter } from "next/navigation";
import { CldUploadButton } from 'next-cloudinary';
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import toast from 'react-hot-toast';
// actions
import { savePhoto } from '@/actions/images/save-photo';
// icons
import { FaRegImage } from "react-icons/fa6";

type Props = {
  userId: string
}


export function UploadPhotoButton({ userId }: Props) {

  const router = useRouter();

  const handleSuccess = async (result: CloudinaryUploadWidgetResults) => {

    if (typeof result.info !== "object") return;

    const url = result.info.secure_url
    const publicId = result.info.public_id

    
    const response = await savePhoto(url, publicId)

    if (!response.success) {
      toast.error(response.error ?? 'Something went wrong');
      return;
    };

    toast.success('Photo uploaded successfully');
    router.refresh();
  }


  return (
    <CldUploadButton
      className='px-4 h-9 flex justify-center items-center gap-2 font-semibold capitalize rounded-md text-white bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 cursor-pointer'
      uploadPreset="user_photos"
      onSuccess={handleSuccess}
      options={{
        folder: `next-match/users/${userId}/gallery`,
        multiple: true,
        maxFiles: 2,
      }}
      
      
    >
      <FaRegImage /> Upload photo
    </CldUploadButton>
  )
}