import * as db from '$db';
export const GET = async () => {
	try {
		await db.sql`DROP TABLE IF EXISTS ${db.sql('verification')}`;
		await db.sql`DROP TABLE IF EXISTS ${db.sql('user')}`;
		await db.sql`DROP TABLE IF EXISTS ${db.sql('role')}`;
		await db.sql`DROP TABLE IF EXISTS ${db.sql('route')}`;

		await db.sql`CREATE TABLE ${db.sql('route')} (
		    id uuid DEFAULT uuid_generate_v4 (),
		    name VARCHAR NOT NULL,
		    href VARCHAR NOT NULL UNIQUE,
		    PRIMARY KEY( id )
		)`;

		const [route] = await db.insert('route', { name: 'dashboard', href: '/dashboard' });

		await db.sql`CREATE TABLE ${db.sql('role')} (
		    id uuid DEFAULT uuid_generate_v4 (),
		    name VARCHAR NOT NULL,
		    route_ids uuid[],
		    PRIMARY KEY( id )
		)`;

		const [role] = await db.insert('role', { name: 'user', route_ids: [route.id] });

		await db.sql`CREATE TABLE ${db.sql('user')} (
		    id uuid DEFAULT uuid_generate_v4 (),
			active BOOLEAN DEFAULT FALSE,
		    email VARCHAR NOT NULL UNIQUE,
		    password VARCHAR NOT NULL,
		    role_ids uuid[],
		    verified BOOLEAN DEFAULT FALSE,
		    PRIMARY KEY( id )
		)`;

		await db.sql`CREATE TABLE ${db.sql('verification')} (
			id uuid DEFAULT uuid_generate_v4 (),
			attempts_remaining SMALLINT NOT NULL DEFAULT 3,
			code VARCHAR NOT NULL,
			user_id VARCHAR NOT NULL UNIQUE,
			PRIMARY KEY( id )
		)`;
	} catch (error) {
		console.log(error);
	}
	return new Response();
};
