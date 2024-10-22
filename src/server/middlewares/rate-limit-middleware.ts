import { NextFunction, Request, Response } from 'express';
import { getClientIp } from '../utils/ip-util';
import { incrementRateCount } from '../services/rate-limit-service';
import logger from '../config/winston';
import { RATE_LIMIT_MAX } from '../config/constant';

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const ip = getClientIp(req);
		const count = await incrementRateCount(ip);
		logger.info(`requext count for ${ip} is ${count} `);
		if (count > RATE_LIMIT_MAX) {
			return res.status(429).send({
				message: 'Too many requests, please try again later.',
				code: 'tooManyRequest',
			});
		}
	} catch (error) {
		logger.error(error);
	}

	next();
};
