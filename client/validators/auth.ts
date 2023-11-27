import { string, z } from 'zod';

// zod schema for tenant/business signup
export const registerSchema = z.object({
  businessName: z.string().min(3).max(255),
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100),
  country: z.string().optional(),
  phoneNumber: z
    .string().min(5)

    .refine((val) => !isNaN(val as unknown as number), {
      message: 'phone number should be a Number ',
    }),
  activeCustomers: z.string(),

  refer: z.string().optional(),
});
 
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  
})

export const passwordZod = z.object({

  password: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100),
})

export const otpZod = z.object({

  otp: z.string().length(4),

})

export const emailZod = z.object({

  email: z.string().email()

})



export const gymcreationSchema = z.object({
  name: z.string({required_error: 'Please provide a gym name'}).max(200),
 phoneNumber: z
  .string().min(7).max(15)

  .refine((val) => !isNaN(val as unknown as number), {
    message: 'phone number should be a Number ',
  }),
  country: z.string({required_error: "Please select a country"}),
  state: z.string({required_error: "Please select a state"}),

})


export const staffcreationSchema = z.object({
  email: z.string({required_error:'email is required'}).email(),
  role: z.enum(['owner', 'member']).default('member')

})


