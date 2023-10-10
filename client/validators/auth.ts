import { z } from 'zod';

// zod schema for tenant/business signup
export const registerSchema = z.object({
  businessName: z.string().min(3).max(255),
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  confirmPassowrd: z.string().min(8).max(100),
  country: z.string(),
  phoneNumber: z
    .string()
    .min(6, {message: 'must contain at least 8 number(s)'})
    .max(17)
    .refine((val) => !isNaN(val as unknown as number), {
      message: 'phone number should be a Number ',
    }),
  activeCustomers: z.string(),
  refer: z.string().optional(),
});
