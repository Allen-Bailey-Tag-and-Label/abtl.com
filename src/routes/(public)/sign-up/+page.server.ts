import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import { sql } from '$db';
import { PUBLIC_BASE_PATH } from '$env/static/public';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ fetch, request }) => {
		// reset db
		// await fetch('/api/dbInit');

		// destructure formData
		const { email, password, passwordVerify } = Object.fromEntries(await request.formData());

		// check if passwords don't match
		if (password !== passwordVerify)
			return fail(401, {
				error: { code: 401, message: 'Passwords do not match.  Please try again.' },
				email,
				password,
				passwordVerify
			});

		// calculate password hash
		const hash = await argon2.hash(password);

		// find default role
		const [role] = await sql`select id from role WHERE name='user'`;

		let user;
		try {
			// insert into db
			const users = await sql`
			insert into ${sql('user')} ${sql(
				{ email, password: hash, role_ids: [role.id] },
				'email',
				'password',
				'role_ids'
			)} returning *`;
			user = users[0];
		} catch (error) {
			return fail(409, {
				error: { code: 409, message: 'Email already exists.  Please sign in' },
				email,
				password,
				passwordVerify
			});
		}

		// generate verification code
		const code = Math.floor(Math.random() * 1000000)
			.toString()
			.padStart(6, '0');

		// insert code into db
		await sql`
		insert into ${sql('verification')} ${sql({ code, user_id: user.id }, 'code', 'user_id')}`;

		// send verification code email
		await fetch('/api/email', {
			body: JSON.stringify({
				from: `"No Reply" <abtl.noreply@gmail.com>`,
				replacements: {
					code,
					PUBLIC_BASE_PATH,
					user_id: user.id
				},
				subject: 'Verify Email - abtl.com',
				template: 'verify-email',
				to: [email]
			}),
			headers: {
				accept: 'application.json',
				'content-type': 'application/json'
			},
			method: 'POST'
		});

		throw redirect(303, '/verify-email');
	}
};
