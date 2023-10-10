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
  phoneNumber: z.number().min(6).max(17),
  activeCustomers: z.string(),
  refer: z.string().optional(),
});
