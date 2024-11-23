import nodemailer from 'nodemailer';
import {
	MAIL_FROM_ADDRESS,
	MAIL_HOST,
	MAIL_PASSWORD,
	MAIL_PORT,
	MAIL_USERNAME,
} from '../config/constant';
import logger from '../config/winston';
import fs from 'fs';
import path from 'path';

let mailContent: string;

const transporter = nodemailer.createTransport({
	host: MAIL_HOST,
	port: parseInt(MAIL_PORT as string),
	secure: false,
	auth: {
		user: MAIL_USERNAME,
		pass: MAIL_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export const generateMail = (url: string) => {
	if (!mailContent) {
		mailContent = fs.readFileSync(path.join(__dirname, '../templates/mail.html'), 'utf8');
	}

	console.log(url);
	return mailContent.replace('###url###', url);
};

export const sendMail = async (to: string, html: string) => {
	try {
		const info = await transporter.sendMail({
			from: MAIL_USERNAME,
			to,
			subject: 'Reset Password',
			html,
		});

		logger.info(info);
		console.log(info);
	} catch (error) {
		console.log(error);
		logger.error(error);
	}
};
