import cookieParser from 'cookie-parser';
import todoRouter from './routers/todo-router';
import express from 'express';
import favicon from 'express-favicon';
import path from 'path';
import { restErrorHandler } from './middlewares/rest-middleware';

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

app.use('/api', todoRouter);
app.use(restErrorHandler);

export default app;
