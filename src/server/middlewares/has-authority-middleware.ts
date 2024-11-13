import { NextFunction, Request, Response } from 'express';

export const hasAuthority =
	(authorities: string[]) => (req: Request, res: Response, next: NextFunction) => {
		try {
			if (
				authorities.includes('owner') &&
				(req.body?.username === req.loggedUser.username ||
					req.params?.id === req.loggedUser.id)
			) {
				next();
			} else if (authorities.includes('ADMIN') && req.loggedUser.role === 'ADMIN') {
				next();
			} else {
				res.status(403).json({ message: 'Forbidden' });
			}
		} catch (error) {
			console.error(error);
			next(error);
		}
	};
