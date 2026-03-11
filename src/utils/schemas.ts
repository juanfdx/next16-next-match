import z from 'zod';


/*==================================================
  Login Schema 
==================================================*/
export const loginSchema = z.object({
  email: z
    .email({ message: 'Invalid email address' })
    .transform((val) => val.trim().toLowerCase()),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginSchema = z.infer<typeof loginSchema>;


/*==================================================
  Register Schema 
==================================================*/
export const registerSchema = z.object({
  email: z
    .email({ message: 'Invalid email address' })
    .transform((val) => val.trim().toLowerCase()),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'], // attach error to confirmPassword field
  message: 'Passwords do not match',
});

export type RegisterSchema = z.infer<typeof registerSchema>;


/*==================================================
  Reset Password Schema 
==================================================*/
export const resetPasswordSchema = z.object({
  email: z
    .email({ message: 'Invalid email address' })
    .transform((val) => val.trim().toLowerCase()),
})


/*==================================================
  Update Password Schema 
==================================================*/
export const updatePasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  path: ['confirmPassword'], // attach error to confirmPassword field
  message: 'Passwords do not match',
})


/*==================================================
  Profile Schema - nullish to work with react hook form
==================================================*/
export const userSchema = z.object({
  name: z.string().nullish(),
  username: z.string().nullish(),
  email: z
    .email({ message: 'Invalid email address' })
    .transform((val) => val.trim().toLowerCase())
    .nullish(),
  image: z.string().nullish(),
  gender: z.enum(["male", "female", "other"]).default("male").nullish(),
  dateOfBirth: z.string().nullish(),
  description: z.string().nullish(),
  city: z.string().nullish(),
  country: z.string().nullish(),
});

// Type inference
export type UserSchema = z.infer<typeof userSchema>;


/*==================================================
  User Image Schema 
==================================================*/
export const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => file instanceof File, "Image is required")
    .refine((file) => file?.size <= 1000000, "Image size should be less than 1MB")
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file?.type),
      "Image must be a JPEG, PNG, or WebP file"
    ),
});