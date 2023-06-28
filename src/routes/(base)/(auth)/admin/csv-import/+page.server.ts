import { sql } from '$db';
export const actions = {
	default: async ({ request }) => {
		// destructure form
		const { csv, table } = Object.fromEntries(await request.formData());

		// convert csv to headers & rows
		let [headers, ...rows] = csv.split('\r\n').map((row: string) =>
			row.split('\t').map((cell) => {
				if (cell === 'False') return false;
				if (cell === 'True') return true;
				return cell;
			})
		);

		// convert rows to objects
		rows = rows.map((row) =>
			row.reduce((object, item, i) => {
				object[headers[i]] = item;
				return object;
			}, {})
		);

		try {
			await sql`insert into ${sql(table)} ${sql(rows)}`;
		} catch (error) {
			console.log(error);
		}
		return { success: true };
	}
};
