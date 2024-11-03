import cookieParser from 'cookie-parser';
import authRouter from './routers/auth-router';
import todoRouter from './routers/todo-router';
import userRouter from './routers/user-router';
import express from 'express';
import favicon from 'express-favicon';
import path from 'path';
import { restErrorHandler } from './middlewares/rest-middleware';
import { rateLimitMiddleware } from './middlewares/rate-limit-middleware';
import { reactMiddleware } from './middlewares/react-middleware';
import { NODE_ENV } from './config/constant';
import { authMiddleware } from './middlewares/auth-middleware';

const app = express();

app.set('trust proxy', 1);

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api/ping', (_, res) => {
	res.status(200).json({ message: 'OK' });
});

app.use('/api', rateLimitMiddleware);
app.use('/api', authRouter);
app.use('/api', authMiddleware, todoRouter);
app.use('/api', authMiddleware, userRouter);

app.use(restErrorHandler);

if (NODE_ENV === 'production') {
	app.use(reactMiddleware);
}

export default app;
