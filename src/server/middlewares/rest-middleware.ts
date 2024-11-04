import { ErrorRequestHandler } from 'express';
import { MongoServerError } from 'mongodb';
import logger from '../config/winston';

export const restErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	try {
		logger.error(err);

		if (err instanceof MongoServerError) {
			const { password, passwordConfirm, ...formData } = req.body;

			if ((err.message as string).includes('duplicate')) {
				return res.status(400).json({
					message: 'duplicateData',
					formData,
				});
			} else {
				return res.status(400).json({
					message: err.message,
					formData,
				});
			}
		} else {
			res.status(err.status || 500);
			return res.json({ message: err.message });
		}
	} catch (error) {
		logger.error(error);

		res.status(err.status || 500);
		return res.json({ message: err.message });
	}
};
