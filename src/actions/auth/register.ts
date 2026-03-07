'use server';

import { registerSchema, type RegisterSchema } from '@/utils/schemas';
import type { Result } from '@/utils/types';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';




export async function registerUser(
  data: RegisterSchema
): Promise<Result<{ message: string }>> {
  
  // 1️⃣ Validate inputs
  const validated = registerSchema.safeParse(data);

  if (!validated.success) {
    return { 
      success: false, 
      error: validated.error?.issues[0]?.message ?? 'An error occurred'
    };
  }

  const { email, password } = validated.data;


  try {
    // 2️⃣ Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        success: false,
        error: "Email already registered",
      };
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      data: {
        message: "User registered"
      },
    };

    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };   
  }
}