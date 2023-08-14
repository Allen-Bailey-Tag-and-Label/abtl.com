import { sql } from '$db';
export const load = async ({}) => {
	const rows = await sql`select * from aes_features`;
	return {
		rows
	};
};
