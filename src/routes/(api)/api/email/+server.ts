import { promises as fs } from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { NODEMAILER_PASSWORD } from '$env/static/private';

const getTemplate = async (template: string) => {
	const html = await fs.readFile(
		`./src/routes/(email-templates)/email-templates/${template}/html.html`,
		{ encoding: 'utf-8' }
	);
	return html;
};

const handlebarsReplacements = (html: string, replacements: { [key: string]: any }) => {
	const template = handlebars.compile(html);
	const replacedHtml = template(replacements);
	return replacedHtml;
};

export const POST = async ({ request }) => {
	const { from, replacements, subject, template, to } = await request.json();

	// setup transporter
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'abtl.noreply@gmail.com',
			pass: NODEMAILER_PASSWORD
		}
	});

	// get html from template
	const html = handlebarsReplacements(await getTemplate(template), replacements);
	// const html = await inlineCss(handlebarsReplacements(await getTemplate(template), replacements));

	// setup options
	const options = {
		html,
		from,
		to,
		subject
	};

	// send email
	await transporter.sendMail(options);
	return new Response();
};
