'use client';

import { useState } from 'react';
import Link from 'next/link';
// dependencies
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// utils
import { loginSchema } from '@/utils/schemas';
// components
import { Button, Form, Input, Label } from '@heroui/react';

/* Infer Type from Schema */
type FormData = z.infer<typeof loginSchema>;



export const LoginForm = () => {

  const [isPending, setIsPending] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setError, 
    reset 
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });


  const onSubmit = async (data: FormData) => {
    
    // setIsPending(true);
    console.log(data);
  }

  

  return (
    <Form 
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-96 flex-col gap-2 p-8 bg-white dark:bg-[#18181B] rounded-lg shadow-xs border'
    >
      <h1 className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-3xl mb-7 mx-auto leading-10">
        Login
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

      {/* Submit */}
      <Button 
        type="submit" 
        className="w-full h-10 mt-5 text-md bg-linear-to-r from-purple-500 to-pink-500 rounded-lg" 
        isDisabled={isPending}
      >
        {isPending ? 'Logging in...' : 'Log in'}
      </Button>
      
      {/* Links */}
      <div className='flex flex-col mt-1'>
        <p className='m-auto text-gray-500 dark:text-gray-400'>
          Don&apos;t have an account? 
          <Link href="/auth/register" className="ml-1 text-sm hover:underline hover:text-black dark:hover:text-white underline-offset-2">
            Sign Up
          </Link>
        </p>

        <p className='m-auto text-gray-500 dark:text-gray-400'>
          Forgot your password? 
          <Link 
            href={{
              pathname: "/auth/reset-password",
              query: { email: 'emailValue'  },
            }}
            className="ml-1 text-sm hover:underline hover:text-black dark:hover:text-white underline-offset-2"
          >
            Reset Password
          </Link>
        </p>
      </div>
    </Form>
  )
}