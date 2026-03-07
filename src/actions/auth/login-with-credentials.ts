'use server';

import { type LoginSchema, loginSchema } from '@/utils/schemas';
import type { Result } from '@/utils/types';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';




export async function loginWithCredentials(
  data: LoginSchema
): Promise<Result<{ message: string }>> {
  
  // 1️⃣ Validate inputs
  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    return { 
      success: false, 
      error: validated.error?.issues[0]?.message ?? 'An error occurred'
    };
  }

  const { email, password } = validated.data;

  try {
    /* 
    *  In server side signIn() throws a special error when credentials fail,
    *  It does NOT return { error: "CredentialsSignin" } like the client version does.
    *  Instead it jumps directly to catch.
    */

    // 2️⃣ Attempt to sign in
    await signIn('credentials', { 
      email, 
      password, 
      redirect: false 
    });

    return {
      success: true,
      data: { message: "Login successful" },
    };
    

  } catch (error) {
    // 👇 THIS is the important part
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          success: false,
          error: "Invalid credentials",
        };
      }
    }

    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };    
  }
}