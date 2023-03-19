import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import { httpLogger, logger } from './services/logger';
import config from './services/config';
import routes from './controllers';
import joiErrorHandler from './middlewares/validationErrorHandler';

const app = express();
app.use(httpLogger());
app.use(helmet());
app.use(compression());
// TODO: Add more restrictions to cors requests
app.use(
    cors({
        origin: config.get('client.host'),
    }),
);
app.use(express.json());

app.use(routes);

app.use(joiErrorHandler());
app.listen(config.get('port'), () => {
    logger.info(
        `Server started at port ${config.get('port')} in ${config.get(
            'env',
        )} mode`,
    );
});
