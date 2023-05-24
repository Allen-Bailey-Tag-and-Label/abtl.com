import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import { sql } from '$db';
import type { Actions } from './$types';

export const actions = {
	default: async ({ fetch, request }) => {
		await fetch('/api/dbInit');
		const { email, password } = Object.fromEntries(await request.formData());
		const hash = await argon2.hash(password);
		try {
			const [role] = await sql`select id from role WHERE name='user'`;
			const [user] = await sql`
			insert into ${sql('user')} ${sql(
				{ email, password: hash, role_ids: [role.id] },
				'email',
				'password',
				'role_ids'
			)} returning *`;
			const code = Math.floor(Math.random() * 1000000)
				.toString()
				.padStart(6, '0');
			await sql`
			insert into ${sql('verification')} ${sql({ code, user_id: user.id }, 'code', 'user_id')}`;
			await fetch('/api/email', {
				body: JSON.stringify({
					from: `"No Reply" <abtl.noreply@gmail.com>`,
					replacements: {
						code,
						email
					},
					subject: 'abtl.com - Verify Email',
					template: 'verify-email',
					to: [email]
				}),
				headers: {
					accept: 'application.json',
					'content-type': 'application/json'
				},
				method: 'POST'
			});
		} catch (error) {
			console.log(error);
			return fail(409, { error: { code: 409, message: 'Email already exists' }, email, password });
		}

		throw redirect(303, '/verify-email');
	}
} satisfies Actions;
