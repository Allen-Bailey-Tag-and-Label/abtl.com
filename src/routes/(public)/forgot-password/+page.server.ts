import { fail, redirect } from '@sveltejs/kit';
import { sql } from '$db';
import { PUBLIC_BASE_PATH } from '$env/static/public';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ fetch, request }) => {
		// destructure formData
		const { email } = Object.fromEntries(await request.formData());

		// find user in db
		const [user] = await sql`select * from ${sql('user')} where email=${email}`;

		// check if user doesn't exist
		if (!user)
			return fail(403, { code: 403, message: 'Email does not exist.  Please check email' });

		// generate verification code
		const code = Math.floor(Math.random() * 1000000)
			.toString()
			.padStart(6, '0');

		// remove previous code
		await sql`delete from ${sql('verification')} where user_id=${user.id}`;

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
				subject: 'Reset Password - abtl.com',
				template: 'verify-password',
				to: [email]
			}),
			headers: {
				accept: 'application.json',
				'content-type': 'application/json'
			},
			method: 'POST'
		});

		throw redirect(303, '/verify-password');
	}
};
