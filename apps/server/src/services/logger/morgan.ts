import morgan, { StreamOptions } from 'morgan';
import logger from './winston';

const stream: StreamOptions = {
    write: (message: string) => {
        logger.info(message);
    },
};

const httpLogger = () => morgan('dev', { stream });

export default httpLogger;
