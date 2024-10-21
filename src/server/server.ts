import app from './app';
import { NODE_ENV, PORT } from './config/constant';
import logger from './config/winston';

const callback = () => {
    logger.info(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
    logger.info(`[SERVER] NODE_ENV : ${NODE_ENV}`);
};

const main = () => {
    try {
        app.listen(parseInt(PORT), callback);
    } catch (error) {
        logger.error(error);
        process.exit();
    }
};

main();