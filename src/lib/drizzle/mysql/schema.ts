import { bigint, boolean, int, mysqlTable, timestamp, varchar, json, datetime } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { generateId } from 'lucia';

const timestampValues = {
	createdAt: timestamp('created_at', { mode: 'date' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP()`),
	updatedAt: timestamp('updated_at', { mode: 'date' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP()`)
};

const user = mysqlTable('auth_user', {
	...timestampValues,
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => generateId(15)),
	email: varchar('email', { length: 255 }).unique().notNull(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	hashedPassword: varchar('hashed_password', { length: 512 }),
	googleRefreshToken: varchar('google_refresh_token', { length: 1024 }),

	// From GitHub
	githubUsername: varchar('github_username', { length: 255 }).unique()
});

const userProfile = mysqlTable('user_profile', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => generateId(15)),
	userId: varchar('user_id', { length: 255 })
		.unique()
		.notNull()
		.references(() => user.id),

	// From Google
	firstName: varchar('first_name', { length: 255 }),
	lastName: varchar('last_name', { length: 255 }),
	picture: varchar('picture', { length: 1024 }).default('images/default.png'),

	// Address
	line1: varchar('line1', { length: 255 }),
	line2: varchar('line2', { length: 255 }),
	city: varchar('city', { length: 255 }),
	state: varchar('state', { length: 255 }),
	postcode: varchar('postcode', { length: 255 }),
	country: varchar('country', { length: 255 }),

	biography: varchar('biography', { length: 2048 }),
	birthdate: varchar('birthdate', { length: 255 }),

	phoneNumber: varchar('phone_number', { length: 16 }),
	stripeId: varchar('stripe_id', { length: 255 }),
	admin: boolean('admin').default(false)
});

const emailVerification = mysqlTable('email_verification', {
	...timestampValues,
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => generateId(15)),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expires: bigint('expires', { mode: 'bigint' }).notNull()
});

const passwordResetToken = mysqlTable('password_reset_token', {
	...timestampValues,
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => generateId(15)),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expires: bigint('expires', { mode: 'bigint' }).notNull()
});

const userSession = mysqlTable('user_session', {
	...timestampValues,
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => generateId(15)),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { mode: 'date' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP()`)
});

export {
	emailVerification,
	passwordResetToken,
	user,
	userProfile,
	userSession
};
