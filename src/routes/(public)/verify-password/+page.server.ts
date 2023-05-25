import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import * as db from '$db';
import type { Actions, PageServerLoad } from './$types';

const deleteRow = async (user_id: string) =>
	await db.sql`delete from ${db.sql('verification')} where user_id=${user_id}`;

export const load: PageServerLoad = async ({ url }) => {
	// check for url serachParams
	const { code, user_id } = Object.fromEntries(url.searchParams);

	// check if code and user_id do not exist
	if (!code && !user_id)
		return {
			message:
				'Thank you for requesting your password to be reset. Please check your email for a link to reset your password'
		};

	// find verification record
	const [verification] = await db.sql`select * from ${db.sql(
		'verification'
	)} where code=${code} and user_id=${user_id}`;

	// check if no verification found
	if (!verification)
		return {
			error: { message: 'Something went wrong.  Please try requesting another password reset' }
		};

	return { code, user_id };
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		// get data from body
		const { code, password, passwordVerify, user_id } = Object.fromEntries(
			await request.formData()
		);

		// check if passwords don't match
		if (password !== passwordVerify)
			return fail(401, {
				error: { code: 401, message: 'Passwords do not match.  Please try again.' },
				password,
				passwordVerify
			});

		// find verification row matching the user_id
		const [verification] = await db.sql`select * from ${db.sql(
			'verification'
		)} where user_id=${user_id}`;

		// throw an error if no verification info was found
		if (verification === undefined)
			return fail(404, {
				error: {
					code: 404,
					message: 'Something went wrong.  Please try requesting another password reset'
				},
				password,
				passwordVerify
			});

		// check if verification code doesn't match
		if (verification.code !== code) {
			// check if out of verification attempts
			if (verification.attempts_remaining < 1) {
				await deleteRow(user_id);
				return fail(404, {
					error: {
						code: 404,
						message:
							'Incorrect code used too many times.  Please try requesting another password reset'
					}
				});
			}

			console.log(verification.code, code);

			// subtract one verification attempt
			await db.sql`update ${db.sql(
				'verification'
			)} set attempts_remaining = attempts_remaining - 1 WHERE user_id=${user_id}`;
			return fail(404, {
				error: {
					code: 404,
					message: 'Incorrect code provided.  Please try requesting another password reset'
				}
			});
		}

		// calculate password hash
		const hash = await argon2.hash(password);

		// update user in db
		await db.sql`update ${db.sql('user')} set password=${hash} where id=${user_id}`;

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

		throw redirect(303, '/');
	}
};
