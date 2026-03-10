'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '../../../auth';
// utils
import { UserSchema, userSchema } from '@/utils/schemas';
import { Member, Result } from '@/utils/types';



export const updateUser = async (formData: UserSchema): Promise<Result<Member>> => {

  // 1️⃣ Prevent unauthorized users
  const session = await auth();

  if (!session?.user?.id) {
    return { 
      success: false, 
      error: 'Unauthorized', 
    };
  }


  // 2️⃣ Validate input
  // const rawData = Object.fromEntries(formData);
  const validatedFields = userSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return { 
      success: false, 
      error: validatedFields.error?.issues[0]?.message ?? 'An error occurred'
    };
  }


  try {
    // 3️⃣ Optional: check if email is provided and different
    if (validatedFields.data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: validatedFields.data.email,
          NOT: { id: session.user.id }, // exclude current user
        },
      });

      if (existingUser) {
        return { 
          success: false, 
          error: 'This email is already in use' 
        };
      }
    }
    // 4️⃣ Atomic Update
    const user = await prisma.user.update({ 
      where: { id: session.user.id }, 
      data: {
        name: validatedFields.data.name,
        username: validatedFields.data.username,
        email: validatedFields.data.email ?? undefined,
        image: validatedFields.data.image,
        gender: validatedFields.data.gender ?? undefined,
        dateOfBirth: validatedFields.data.dateOfBirth,
        description: validatedFields.data.description,
        city: validatedFields.data.city,
        country: validatedFields.data.country
      } 
    }); 

    return { 
      success: true, 
      data: user, 
    };


  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    }; 
  }
}