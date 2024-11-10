import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constant';
import logger from '../config/winston';

type TokenData = {
	username: string;
} & JwtPayload;

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	logger.info(`originalUrl : ${req.originalUrl}`);

	if (req.originalUrl.startsWith('/api/')) {
		await new Promise(r => setTimeout(r, 1000));
		//throw new Error("testing");

		const token = req.header('Authorization')?.replace('Bearer ', '');

		if (!token || token === 'undefined' || token.trim().length === 0) {
			logger.info('No token provided');
			return res.status(401).json({ message: 'No token provided', code: 'noTokenProvided' });
		}

		try {
			const data = jwt.verify(token, JWT_SECRET) as TokenData;
			logger.info(data);
		} catch (error) {
			logger.error(error);
			return res.status(401).json({ message: 'Invalid token', code: 'invalidToken' });
		}
	}

	next();
};
