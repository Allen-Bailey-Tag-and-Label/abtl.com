import nodemailer from 'nodemailer';
import { NODEMAILER_PASSWORD } from '$env/static/private';

const getTemplate = async (template: string, props) => {
	const component = (
		await import(`../../../(email-templates)/email-templates/${template}/+page.svelte`)
	).default;
	console.log(component);
	return '';
	// return html;
};

export const POST = async ({ request }) => {
	const { from, props, subject, template, to } = await request.json();

	// setup transporter
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'abtl.noreply@gmail.com',
			pass: NODEMAILER_PASSWORD
		}
	});

	// get html from template
	const html = await getTemplate(template, props);

	// // setup options
	// const options = {
	// 	html,
	// 	from,
	// 	to,
	// 	subject
	// };

	// // send email
	// await transporter.sendMail(options);
	return new Response();
};
