import inlineCss from 'inline-css';
import nodemailer from 'nodemailer';
import type { SvelteComponent } from 'svelte';
import { NODEMAILER_PASSWORD } from '$env/static/private';
import styles from '../../output.css?inline';

export const send = async (
	template: SvelteComponent,
	subject: string,
	to: string | string[],
	props?: { [key: string]: any },
	from: string = '"No Reply" <abtl.noreply@gmail.com>'
) => {
	// setup transporter
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'abtl.noreply@gmail.com',
			pass: NODEMAILER_PASSWORD
		}
	});

	// get html from template
	const { html } = template.render(props);

	// set docType
	const doctype =
		'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

	// concate email components
	const emailContents = `${doctype}<html><head><style>${styles}</style><head><body>${html}</body></html>`;

	// inline email
	const inlineEmail = await new Promise((res) => {
		const options = {
			url: './'
		};
		inlineCss(emailContents, options)
			.then((inlineHtml: string) => res(inlineHtml))
			.catch((error) => {
				console.log(error);
				res('');
			});
	});

	// setup options
	const options = {
		html: inlineEmail,
		from,
		to,
		subject
	};

	// send email
	await transporter.sendMail(options);
};
