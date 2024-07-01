import { TRANSACTIONAL_EMAILS_ADDRESS, TRANSACTIONAL_EMAILS_SENDER } from '$env/static/private';
import { generateEmailVerificationToken } from '$lib/drizzle/mysql/models/tokens';
import { createUser, getUserByEmail, updateUserProfileData } from '$lib/drizzle/mysql/models/users';
import { sendEmail } from '$lib/emails/send';
import { lucia } from '$lib/lucia/mysql';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signupSchema } from './schema';

export const load = async ({ locals }) => {
	const { session } = locals;

	if (session) {
		redirect(302, '/');
	}

	const signupForm = await superValidate(zod(signupSchema));

	return { signupForm };
};

export const actions = {
	signupUser: async ({ cookies, request, url }) => {
		const form = await superValidate(request, zod(signupSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { pseudo, firstName, lastName, email, password } = form.data;

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return fail(400, {
				form
			});
		}

		const userId = generateId(15);

		const user = await createUser({
			id: userId,
			email,
			emailVerified: false,
			hashedPassword: await new Argon2id().hash(password)
		});

		// Update user profile data
		await updateUserProfileData({
			id: generateId(15),
			userId: user.id,
			pseudo,
			firstName,
			lastName
		});

		const session = await lucia.createSession(user.id, {
			created_at: new Date(),
			updated_at: new Date()
		});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		const verificationToken = await generateEmailVerificationToken(user.id);
		const sender = `${TRANSACTIONAL_EMAILS_SENDER} <${TRANSACTIONAL_EMAILS_ADDRESS}>`;
		const recipient = firstName ? `${firstName}` : email;
		const emailHtml = `Hello ${recipient},
						   <br><br>
						   Thank you for signing up to Vulpilist! Please click the link below to verify your email address:
						   <br><br>
						   <a href="${url.origin}/app/email-verification/${verificationToken}">Verify Email Address</a>
						   <br>
						   You can also copy directly into your browser:
						   <br><br>
						   <code>${url.origin}/app/email-verification/${verificationToken}</code>
						   <br><br>
						   Thanks,
						   <br>
						   ${TRANSACTIONAL_EMAILS_SENDER}`;

		const signupEmail = await sendEmail({
			from: sender,
			to: email,
			subject: 'Verify Your Email Address',
			html: emailHtml
		});

		if (signupEmail[0].type === 'error') {
			return fail(500, {
				form
			});
		}

		redirect(302, '/app/email-verification');
	}
};
