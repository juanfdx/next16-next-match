'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';
import type { Profile, Result } from '@/utils/types';



export const getUsers = async (): Promise<Result<Profile[]>> => {

  // 1️⃣ Prevent unauthorized users
  const session = await auth();

  if (!session?.user?.id) {
    return { 
      success: false, 
      error: 'Unauthorized', 
    };
  }


  try {
    // 2️⃣ Get users
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: session.user.id, // <-- exclude self
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        gender: true,
        dateOfBirth: true,
        description: true,
        city: true,
        country: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      data: users,
    };

    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    }; 
  }

  
  
}