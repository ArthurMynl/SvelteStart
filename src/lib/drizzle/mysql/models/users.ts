import { drizzleClient } from '$lib/drizzle/mysql/client';
import { user, userProfile } from '$lib/drizzle/mysql/schema';
import { eq } from 'drizzle-orm';

const getUserByEmail = async (email: string) => {

	const data = await drizzleClient.select().from(user).where(eq(user.email, email));

	return data[0];
};

const getUserMailById = async (userId: string) => {
	const data = await drizzleClient.select().from(user).where(eq(user.id, userId));
	return data[0].email;
};

const createUser = async (data: typeof user.$inferInsert) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [resultSetHeader, _] = await drizzleClient.insert(user).values(data);

	const result = await drizzleClient
		.select()
		.from(user)
		.where(eq(user.id, data.id ?? resultSetHeader.insertId.toString()));

	return result[0];
};

const updateUserData = async (userId: string, data: Partial<typeof user.$inferInsert>) => {
	await drizzleClient.update(user).set(data).where(eq(user.id, userId));
};

const updateUserProfileData = async (profileData: typeof userProfile.$inferInsert) => {
	await drizzleClient
		.insert(userProfile)
		.values(profileData)
		.onDuplicateKeyUpdate({
			set: Object.fromEntries(
				Object.entries(profileData).filter(([key]) => !['id', 'userId'].includes(key))
			)
		});
};

const getUserProfileData = async (userId: string | undefined) => {
	if (!userId) {
		return undefined;
	}

	const data = await drizzleClient.select().from(userProfile).where(eq(userProfile.userId, userId));
	return data[0];
};

const getUserStripeId = async (userId: string | undefined) => {
	if (!userId) {
		return undefined;
	}

	const data = await drizzleClient.select().from(userProfile).where(eq(userProfile.userId, userId));
	return data[0].stripeId;
}

export { createUser, getUserByEmail, getUserProfileData, updateUserData, updateUserProfileData, getUserStripeId, getUserMailById };
