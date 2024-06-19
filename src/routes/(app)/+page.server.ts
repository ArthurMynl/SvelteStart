import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate, setError } from 'sveltekit-superforms';
import { getUserProfileData, getUserByEmail } from '$lib/drizzle/mysql/models/users';
import { lucia } from '$lib/lucia/mysql.js';
import { Argon2id } from 'oslo/password';

export const load = async ({ locals }) => {
	const { user } = locals;

	const form = await superValidate(zod(loginUserSchema));
	const logoutForm = await superValidate(zod(logoutSchema));

	const profile = await getUserProfileData(user?.id);

	return { form, logoutForm, profile };
};

const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1)
});

const logoutSchema = z.object({});

export const actions = {
	loginUser: async ({ cookies, request }) => {
		const form = await superValidate(request, zod(loginUserSchema));

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
	},
	logout: async ({ cookies, locals, request }) => {
		const { session } = locals;

		const form = await superValidate(request, zod(logoutSchema));

		if (!session) {
			return fail(401, { form });
		}

		// Invalidate session
		await lucia.invalidateSession(session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		// Remove OAuth cookies
		cookies.delete('github_oauth_state', { path: '/' });
		cookies.delete('google_oauth_state', { path: '/' });
		cookies.delete('google_oauth_code_verifier', { path: '/' });

		return message(form, {
			type: 'success',
			title: 'Logout successful',
			description: 'You have been logged out successfully!'
		});
	}
};
