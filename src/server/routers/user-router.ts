import express, { NextFunction, Request, Response } from 'express';
import {
	ChangePasswordSchema,
	CreateUserSchema,
	UpdateUserSchema,
} from '../../validations/user-validation';
import { hasAuthority } from '../middlewares/has-authority-middleware';
import * as userService from '../services/user-service';

/**
 * A router that handles User REST API
 * @author ferrylinton
 * @module UserRouter
 */

const getUserHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const page: number = parseInt((req.query.page as string) || '0');
		const result = await userService.find({ ...req.query, page });
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

/**
 * Handler for Endpoint POST /users
 * @param req {Object} The request.
 * @param req.body.task {String} The task.
 * @param res {Object} The response.
 * @param {Function} next
 */
const postUserHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = CreateUserSchema.safeParse(req.body);

		if (validation.success) {
			const { passwordConfirm, ...input } = validation.data;
			const user = await userService.create(input, req.loggedUser.username);
			res.status(201).json(user);
		} else {
			const { fieldErrors } = validation.error.flatten();
			res.status(400).json(fieldErrors);
		}
	} catch (error) {
		next(error);
	}
};

/**
 * Handler for Endpoint GET /users/:id
 * @param req {Object} The request.
 * @param req.params.id {String} User Id.
 * @param res {Object} The response.
 * @param {Function} next
 */
const getUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userService.findById(req.params.id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: 'Data is not found' });
		}
	} catch (error) {
		next(error);
	}
};

/**
 * Handler for Endpoint PUT /users/:id
 * @param req {Object} The request.
 * @param req.params.id {String} User Id.
 * @param res {Object} The response.
 * @param {Function} next
 */
const putUserHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = UpdateUserSchema.safeParse(req.body);

		if (validation.success) {
			const input = {
				id: req.params.id,
				updatedBy: validation.data.username,
				updatedAt: new Date(),
				...validation.data,
			};

			if (req.loggedUser.username !== input.updatedBy) {
				input.updatedBy = req.loggedUser.username;
			}

			const updateResult = await userService.update(input);
			res.status(200).json(updateResult);
		} else {
			const { fieldErrors } = validation.error.flatten();
			return res.status(400).json(fieldErrors);
		}
	} catch (error) {
		next(error);
	}
};

const changePasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validation = ChangePasswordSchema.safeParse(req.body);

		if (validation.success) {
			const { username, password } = validation.data;
			const input = {
				username,
				password,
				updatedBy: validation.data.username,
				updatedAt: new Date(),
			};

			if (req.loggedUser.username !== input.updatedBy) {
				input.updatedBy = req.loggedUser.username;
			}

			const updateResult = await userService.changePassword(input);
			res.status(200).json(updateResult);
		} else {
			const { fieldErrors } = validation.error.flatten();
			return res.status(400).json(fieldErrors);
		}
	} catch (error) {
		next(error);
	}
};

/**
 * Handler for Endpoint DELETE /users/:id
 * @param req {Object} The request.
 * @param req.params.id {String} User Id.
 * @param res {Object} The response.
 * @param {Function} next
 */
const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const deleteResult = await userService.deleteById(req.params.id);
		res.status(200).json(deleteResult);
	} catch (error) {
		next(error);
	}
};

/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/users', hasAuthority(['ADMIN']), getUserHandler);
router.post('/users', hasAuthority(['ADMIN']), postUserHandler);
router.post('/users/password', hasAuthority(['owner', 'ADMIN']), changePasswordHandler);
router.get('/users/:id', hasAuthority(['owner', 'ADMIN']), getUserByIdHandler);
router.put('/users/:id', hasAuthority(['owner', 'ADMIN']), putUserHandler);
router.delete('/users/:id', hasAuthority(['ADMIN']), deleteUserHandler);

export default router;
