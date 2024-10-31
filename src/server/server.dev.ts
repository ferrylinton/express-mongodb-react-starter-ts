import ViteExpress from 'vite-express';
import app from './app';
import { NODE_ENV, PORT } from './config/constant';
import logger from './config/winston';
import { initDb } from './db/create-collections';

const callback = () => {
	logger.info(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
	logger.info(`[SERVER] NODE_ENV : ${NODE_ENV}`);
};

const main = async () => {
	try {
		await initDb();
		ViteExpress.listen(app, parseInt(PORT), callback);
	} catch (error) {
		logger.error(error);
		process.exit();
	}
};

main();
