'use client';

import Link from 'next/link';
// dependencies
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// utils
import { registerSchema } from '@/utils/schemas';
// components
import { Button, Form, Input, Label } from '@heroui/react'
import { registerUser } from '@/actions/auth/register';

/* Infer Type from Schema */
type FormData = z.infer<typeof registerSchema>;



export const RegisterForm = () => {

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitSuccessful, isSubmitting }, 
    setError, 
    reset 
  } = useForm<FormData>({
      resolver: zodResolver(registerSchema),
      mode: "onTouched",
  });
  

  const onSubmit = async (data: FormData) => {

    try {
      const response = await registerUser(data);

      if (!response.success) {
        console.error(`Error: ${response.error}`);
        setError('email', { message: response.error }) // to show all errors on email field
        return
      }
      
      // success
      reset();
         
    } catch (error) {
      console.error(error);
      setError('email', { message: "Something went wrong" }) 
    }
  }



  return (
    <>
      {isSubmitSuccessful ? (
        <div className='flex flex-col w-full max-w-sm mx-auto p-8 bg-white dark:bg-[#18181B] rounded-lg shadow-xs border'>
          <h1 className="m-0 p-0 leading-8 text-2xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Registration successful
          </h1>
          <p className='text-md mt-1 text-muted-foreground'>You can now log in with your credentials</p>
          <Link 
            href="/auth/login" 
            className="flex justify-center items-center w-full h-10 mt-5 text-md text-white font-semibold bg-linear-to-r from-purple-500 to-pink-500 rounded-lg"
          >
            Login to your account
          </Link>
        </div>
        
      ) : ( 
        <Form 
          onSubmit={handleSubmit(onSubmit)} 
          className='flex w-96 flex-col gap-2 p-8 bg-white dark:bg-[#18181B] rounded-lg shadow-xs border'
        >
          <h1 className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-3xl mb-7 mx-auto leading-10">
            Register
          </h1>

          {/* email */}
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              className="mt-1 dark:bg-[#222225] border border-gray-100 dark:border-gray-600 focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              type="email" 
              placeholder="you@example.com" 
              {...register('email')}
            />
            {errors.email ? (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email.message}</span>
            ) : (
              <p className='mt-6'></p>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              className='mt-1 dark:bg-[#222225] border border-gray-100 dark:border-gray-600 focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none'
              type="password" 
              placeholder="Your password" 
              {...register('password')}
            />
            {errors.password ? (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.password.message}</span>
            ) : (
              <p className='mt-6'></p>
            )}
          </div>

          {/* confirm password */}
          <div className="flex flex-col">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              className='mt-1 dark:bg-[#222225] border border-gray-100 dark:border-gray-600 focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none'
              type="password" 
              placeholder="Confirm your password" 
              {...register('confirmPassword')}
            />
            {errors.confirmPassword ? (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.confirmPassword.message}</span>
            ) : (
              <p className='mt-6'></p>
            )}
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            className="w-full h-10 mt-5 text-md bg-linear-to-r from-purple-500 to-pink-500 rounded-lg" 
            isDisabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
          
          {/* Links */}
          <p className='m-auto mt-1 text-gray-500 dark:text-gray-400'>
            Already have an account? 
            <Link href="/auth/login" className="ml-1 text-sm hover:underline hover:text-black dark:hover:text-white underline-offset-2">
              Login
            </Link>
          </p>
        </Form>
      )}
    </>
  )
}
