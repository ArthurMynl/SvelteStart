import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate, setError } from 'sveltekit-superforms';
import { getUserProfileData, getUserByEmail } from '$lib/drizzle/mysql/models/users';
import { lucia } from '$lib/lucia/mysql.js';
import { Argon2id } from 'oslo/password';

export const load = async ({ locals }) => {
	const { user } = locals;

	return { user };
};
