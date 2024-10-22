import { ErrorRequestHandler } from 'express';
import { MongoServerError } from 'mongodb';
import logger from '../config/winston';

export const restErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	try {
		logger.error(err);

		if (err instanceof MongoServerError) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(err.status || 500);
			res.json({ message: err.message });
		}
	} catch (error) {
		logger.error(error);

		res.status(err.status || 500);
		res.json({ message: err.message });
	}
};
