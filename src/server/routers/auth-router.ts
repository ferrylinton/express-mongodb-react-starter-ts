import bcrypt from 'bcryptjs';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/constant';
import * as userService from '../services/user-service';
import { getErrorsObject } from '../../validations/validation-util';
import { AuthenticateSchema, RegisterSchema } from '../../validations/authenticate-schema';

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

					const token = jwt.sign({ username }, JWT_SECRET, {
						expiresIn: `${JWT_EXPIRES_IN}m`,
					});
					return res.status(200).json({ username, role: user.role, token });
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

/**
 * Create instance of Express.Router
 */
const router = express.Router();
router.post('/token', generateTokenHandler);
router.post('/register', registerHandler);

export default router;
