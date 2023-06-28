import postgres from 'postgres';
import { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } from '$env/static/private';

const url = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

export const sql = postgres(url, { ssl: 'require' });

const pgVersion = async () => {
	const result = await sql`select version()`;
	console.log(result);
};

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
