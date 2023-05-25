import { fail, redirect } from '@sveltejs/kit';
import { sql } from '$db';
import type { Actions } from './$types';

const deleteRow = async (user_id: string) =>
	await sql`delete from ${sql('verification')} where user_id=${user_id}`;

export const actions = {
	default: async ({ cookies, request }) => {
		// get data from from body
		const { code, user_id } = Object.fromEntries(await request.formData());

		try {
			// find verification row matching the user_id
			const [verification] = await sql`select * from ${sql(
				'verification'
			)} where user_id=${user_id}`;

			// throw an error if no verification info was found
			if (verification === undefined) throw 'Could not find code.  Please resend verification code';

			// check if verification code doesn't match
			if (verification.code !== code) {
				// check if out of verification attempts
				if (verification.attempts_remaining < 1) {
					await deleteRow(user_id);
					throw 'Incorrect code used too many times.  Please resend verification code';
				}

				// subtract one verification attempt
				await sql`update ${sql(
					'verification'
				)} set attempts_remaining = attempts_remaining - 1 WHERE user_id=${user_id}`;
				throw 'Incorrect code provided.  Please try again';
			}

			// update user table with verified column
			await sql`update ${sql('user')} set verified = true WHERE id=${user_id}`;

			// update user_id cookie
			cookies.set('user_id', user_id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});

			// delete verification row
			await deleteRow(user_id);
		} catch (error) {
			console.log(error);
			return fail(404, { error: { code: 404, message: error }, code, user_id });
		}

		throw redirect(303, '/');
	}
} satisfies Actions;
