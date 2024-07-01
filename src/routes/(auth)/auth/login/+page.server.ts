import { getUserByEmail } from '$lib/drizzle/mysql/models/users';
import { fail, redirect } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { lucia } from '$lib/lucia/mysql.js';
import { Argon2id } from 'oslo/password';
import { loginSchema } from './schema';

export const load = async ({ locals }) => {
	const { session } = locals;

	if (session) {
		redirect(302, '/');
	}

	const loginForm = await superValidate(zod(loginSchema));

	return { loginForm };
};


export const actions = {
	loginUser: async ({ cookies, request }) => {

		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		try {
			const user = await getUserByEmail(email);

			if (!user) {
				return setError(form, 'Invalid email or password');
			}

			if (!user.hashedPassword) {
				return setError(form, 'Invalid email or password');
			}


			const isPasswordValid = await new Argon2id().verify(user.hashedPassword, password);

			if (!isPasswordValid) {
				return setError(form, 'Invalid email or password');
			}

			const session = await lucia.createSession(user.id, {
				created_at: new Date(),
				updated_at: new Date()
			});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (e) {
			return setError(form, 'Please try again later');
		}

		return message(form, {
			type: 'success',
			title: 'Login successful',
			description: 'You have been logged in successfully!'
		});
	}
};
