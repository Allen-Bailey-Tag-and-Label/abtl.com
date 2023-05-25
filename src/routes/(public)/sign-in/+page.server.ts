import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import { sql } from '$db';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		// destructure formData
		const { email, password } = Object.fromEntries(await request.formData());

		// find user on server
		const [user] = await sql`select * from ${sql('user')} where email=${email}`;

		// check if no user found
		if (user === undefined)
			return fail(401, {
				error: { code: 401, message: 'Could not find email.  Please try again' },
				email,
				password
			});

		// check if password doesn't match
		if (!(await argon2.verify(user.password, password)))
			return fail(401, {
				error: { code: 401, message: 'Could not verify credentials.  Please try again' },
				email,
				password
			});

		// update user_id cookie
		cookies.set('user_id', user.id, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/');
	}
};
