'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Member } from '@/utils/types';
// utils
import { type UserSchema, userSchema } from '@/utils/schemas';
// actions
import { updateUser } from '@/actions/user/update-user';
// components
import { Button, Form, Input, Label, TextArea } from '@heroui/react';
import { FaRegCalendar } from "react-icons/fa";

type Props = {
  user: Member
}



export const ProfileForm = ({ user }: Props) => {

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    setError, 
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...user,
      // format dateOfBirth to string, so can be used as default value on input date field
      dateOfBirth: user.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: UserSchema) => {
    
    try {
      const response = await updateUser(data);
  
      if (!response.success) {
        console.error(`Error: ${response.error}`);
        setError('email', { message: response.error })
        return;
      }
  
      
    } catch (error) {
      console.error(error);
      setError('email', { message: "Something went wrong" }) 
    }
  }
  

  return (
    <Form 
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-1 px-6 py-8 sm:px-8 bg-white rounded-lg shadow-lg border border-gray-100'
    >
      <div className='flex gap-4'>
        {/* name */}
        <div className="flex flex-col w-1/2">
          <Label className='text-black' htmlFor="name">Name</Label>
          <Input 
            id="name" 
            className="w-full mt-1 bg-white text-black border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            type="name" 
            placeholder="yor name" 
            {...register('name')}
          />
          {errors.name ? (
            <span className="text-red-500 text-sm mt-0">{errors.name.message}</span>
          ) : (
            <p className='mt-5'></p>
          )}
        </div>

        {/* username */}
        <div className="flex flex-col w-1/2">
          <Label className='text-black' htmlFor="username">Username</Label>
          <Input 
            id="username" 
            className="w-full mt-1 bg-white text-black border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            type="username" 
            placeholder="your username" 
            {...register('username')}
          />
          {errors.username ? (
            <span className="text-red-500 text-sm mt-0">{errors.username.message}</span>
          ) : (
            <p className='mt-5'></p>
          )}
        </div>
      </div>
      
      <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row gap-1 sm:gap-4'>
        {/* email */}
        <div className="flex flex-col w-full sm:w-1/2 md:w-full lg:w-1/2">
          <Label className='text-black' htmlFor="email">Email</Label>
          <Input 
            id="email" 
            className="w-full mt-1 bg-white text-black border border-gray-300 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            type="email" 
            placeholder="you@example.com" 
            {...register('email')}
          />
          {errors.email ? (
            <span className="text-red-500 text-sm mt-0">{errors.email.message}</span>
          ) : (
            <p className='mt-5'></p>
          )}
        </div>

        <div className='flex flex-col sm:flex-row sm:gap-4 w-full sm:w-1/2 md:w-full lg:w-1/2'>
          {/* date of birth */}
          <div className="relative flex flex-col w-full sm:w-1/2 md:w-full lg:w-1/2">
            <Label className='text-black' htmlFor="dateOfBirth">Date of Birth</Label>
            <Input 
              id="dateOfBirth" 
              className="w-full mt-1 bg-white text-black border border-gray-300  focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              type="date" 
              {...register('dateOfBirth')}
            />

            <FaRegCalendar className='w-3 h-3 absolute top-[36.5px] right-4 text-black pointer-events-none' />
            {errors.dateOfBirth ? (
              <span className="text-red-500 text-sm mt-0">{errors.dateOfBirth.message}</span>
            ) : (
              <p className='mt-5'></p>
            )}
          </div>

          {/* gender */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-full lg:w-1/2">
            <Label className='text-black' htmlFor="gender">Gender</Label>
            <select 
              id="gender" 
              className="mt-1 px-3 py-2 sm:py-1.5 rounded-xl bg-white text-black border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              {...register('gender')}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender ? (
              <span className="text-red-500 text-sm mt-0">{errors.gender.message}</span>
            ) : (
              <p className='mt-5'></p>
            )}
          </div>
        </div>
      </div>

      <div className='flex gap-4'>
        {/* description */}
        <div className="flex flex-col w-full">
          <Label className='text-black' htmlFor="description">Description</Label>
          <TextArea 
            id="description" 
            className="mt-1 bg-white text-black border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            placeholder="your description" 
            rows={4}
            {...register('description')}
          />
          {errors.description ? (
            <span className="text-red-500 text-sm mt-0">{errors.description.message}</span>
          ) : (
            <p className='mt-5'></p>
          )}
        </div>
      </div>

      <div className='flex gap-4'>
        {/* city */}
        <div className="flex flex-col w-1/2">
          <Label className='text-black' htmlFor="city">City</Label>
          <Input 
            id="city" 
            className="w-full mt-1 bg-white text-black border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            type="city" 
            placeholder="your city" 
            {...register('city')}
          />
          {errors.city ? (
            <span className="text-red-500 text-sm mt-0">{errors.city.message}</span>
          ) : (
            <p className='mt-5'></p>
          )}
        </div>
        {/* country */}
        <div className="flex flex-col w-1/2">
          <Label className='text-black' htmlFor="country">Country</Label>
          <Input 
            id="country" 
            className="w-full mt-1 bg-white text-black border border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            type="country" 
            placeholder="your country" 
            {...register('country')}
          />
          {errors.country ? (
            <span className="text-red-500 text-sm mt-0">{errors.country.message}</span>
          ) : (
            <p className='mt-5'></p>
          )}
        </div>
      </div>
    

      {/* Submit */}
      <Button 
        type="submit" 
        className="w-full h-10 mt-8 text-md bg-linear-to-r from-purple-500 to-pink-500 rounded-lg" 
        isDisabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </Button>
      
    </Form>
  )
}