import type { Handle } from '@sveltejs/kit';
import * as db from '$db';

export const handle: Handle = async ({ event, resolve }) => {
	// destructure cookies from event
	const { cookies } = event;

	// find user_id in cookie
	const user_id = cookies.get('user_id');

	if (user_id) {
		// find user in database
		const [user] = await db.sql`select * from ${db.sql('user')} where id=${user_id}`;

		// update locals variable
		event.locals.user = user;
	} else {
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	return response;
};
