import bcrypt from 'bcryptjs';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
	AuthenticateSchema,
	ForgotPasswordSchema,
	RegisterSchema,
	ResetPasswordSchema,
} from '../../validations/authenticate-schema';
import { getErrorsObject } from '../../validations/validation-util';
import { HOST, JWT_EXPIRES_IN, JWT_SECRET } from '../config/constant';
import { generateMail, sendMail } from '../services/mail-service';
import * as userService from '../services/user-service';
import * as passwordTokenService from '../services/password-token-service';

/**
 * A router that handles User REST API
 * @author ferrylinton
 * @module AuthRouter
 */

const generateTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = AuthenticateSchema.safeParse(req.body);

		if (validation.success) {
			const { username, password } = validation.data;
			const user = await userService.findByUsername(username);

			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
					if (user.locked) {
						return res.status(401).json({ message: 'usernameIsLocked' });
					}

					const { id, role } = user;
					const token = jwt.sign({ id, role, username }, JWT_SECRET, {
						expiresIn: `${JWT_EXPIRES_IN}m`,
					});
					return res.status(200).json({ id, role, username, token });
				}
			}
		}

		res.status(401).json({ message: 'invalidUsernameOrPassword' });
	} catch (error) {
		next(error);
	}
};

const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = RegisterSchema.safeParse(req.body);

		if (validation.success) {
			const { passwordConfirm, ...input } = validation.data;
			const user = await userService.create({ ...input, role: 'USER' });
			res.status(201).json(user);
		} else {
			res.status(400).json(getErrorsObject(validation.error));
		}
	} catch (error) {
		next(error);
	}
};

const forgotPasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = ForgotPasswordSchema.safeParse(req.body);

		if (validation.success) {
			const { email } = validation.data;
			const user = await userService.findByEmail(email);

			if (user) {
				const { username } = user;
				const { insertedId: token } = await passwordTokenService.create(username);
				const html = generateMail(`${HOST}/resetpassword?token=${token}`);
				sendMail(email, html);
				res.status(200).json({ token });
			} else {
				res.status(404).json({ message: 'emailNotFound' });
			}
		} else {
			const { fieldErrors } = validation.error.flatten();
			return res.status(400).json(fieldErrors);
		}
	} catch (error) {
		next(error);
	}
};

const resetPasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = ResetPasswordSchema.safeParse(req.body);
		console.log(req.body);

		if (validation.success) {
			const { token, password } = validation.data;
			const passwordToken = await passwordTokenService.findById(token);

			if (passwordToken) {
				const input = {
					username: passwordToken.username,
					password,
					updatedBy: passwordToken.username,
					updatedAt: new Date(),
				};

				await userService.changePassword(input);
				res.status(200).json({ username: passwordToken.username });
			} else {
				res.status(400).json({ message: 'invalidToken' });
			}
		} else {
			const { fieldErrors } = validation.error.flatten();
			return res.status(400).json(fieldErrors);
		}
	} catch (error) {
		next(error);
	}
};

/**
 * Create instance of Express.Router
 */
const router = express.Router();
router.post('/token', generateTokenHandler);
router.post('/register', registerHandler);
router.post('/forgotpassword', forgotPasswordHandler);
router.post('/resetPassword', resetPasswordHandler);

export default router;
