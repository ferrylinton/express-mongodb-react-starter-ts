import express, { NextFunction, Request, Response } from 'express';
import * as userService from '../services/user-service';
import { CreateUserSchema } from '../../validations/user-validation';

/**
 * A router that handles User REST API
 * @author ferrylinton
 * @module UserRouter
 */

const getUserHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await new Promise(r => setTimeout(r, 1000));
		//throw new Error("testing");
		const users = await userService.find();
		res.status(200).json(users);
	} catch (error) {
		console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
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
			console.log(validation.data);
			const user = await userService.create(input);
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
		const updateResult = await userService.update(req.params.id);
		res.status(200).json(updateResult);
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

router.get('/users', getUserHandler);
router.post('/users', postUserHandler);
router.get('/users/:id', getUserByIdHandler);
router.put('/users/:id', putUserHandler);
router.delete('/users/:id', deleteUserHandler);

export default router;
