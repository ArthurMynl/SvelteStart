import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1)
});

export type LoginSchema = typeof loginSchema;
export { loginSchema };
