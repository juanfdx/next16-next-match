'use server'

import { auth } from '../../../auth';
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { Result } from '@/utils/types';



export async function deletePhoto(id: string): Promise<Result<{ message: string }>> {

  // 1️⃣ Prevent unauthorized users
  const session = await auth();

  if (!session?.user?.id) {
    return { 
      success: false, 
      error: 'Unauthorized', 
    };
  }

  try {
    // 2️⃣ Find the photo
    const photo = await prisma.photo.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    });

    if (!photo) {
      return {
        success: false,
        error: "Photo not found or you don't have permission"
      };
    }

    // 3️⃣ Delete from Cloudinary if publicId exists
    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }
    else {
      return {
        success: false,
        error: "Requested photo not found in cloudinary"
      };
    }

    // 4️⃣ Delete from DB
    await prisma.photo.delete({
      where: { id }
    });

    return {
      success: true,
      data: {
        message: "Photo deleted successfully"
      }
    };



  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong"
    };
  }

}