import postgres from 'postgres';
import {
	DATABASE_DATABASE,
	DATABASE_ENDPOINT_ID,
	DATABASE_HOST,
	DATABASE_PASSWORD,
	DATABASE_USER
} from '$env/static/private';

const url = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_DATABASE}?options=endpoint%3D${DATABASE_ENDPOINT_ID}`;

export const sql = postgres(url, { ssl: 'require' });

export const drop = (table: string) => sql`DROP TABLE IF EXISTS ${sql(table)}`;
export const insert = (
	table: string,
	object: { [key: string]: any },
	columns: string[] | undefined = undefined
) =>
	sql`INSERT INTO ${sql(table)} ${sql(
		object,
		...(columns === undefined ? Object.keys(object) : columns)
	)} returning *`;
export const select = (table: string, columns: string[] = ['*']) =>
	sql`SELECT ${sql(columns)} FROM ${sql(table)}`;
