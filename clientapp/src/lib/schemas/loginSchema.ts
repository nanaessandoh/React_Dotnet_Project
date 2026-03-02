import { z } from 'zod';
import { requiredString } from '../util/util';

export const loginSchema = z.object({
    email: z.email('Email is invalid').min(1, { message: 'Email is required' }),
    password: requiredString("Password")
});

export type LoginSchema = z.infer<typeof loginSchema>;