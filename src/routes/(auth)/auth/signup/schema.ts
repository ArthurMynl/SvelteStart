import { z } from 'zod';

const signupSchema = z.object({
    pseudo: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
	email: z.string().email(),
    password: z.string().min(1),
    passwordConfirmation: z.string().min(1)
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
});

export type SignupSchema = typeof signupSchema;
export { signupSchema };
