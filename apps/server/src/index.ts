import { State, StateMachine } from '@pmp/constants';
import express from 'express';
import { httpLogger, logger } from './services/logger';
import config from './services/config';

const state: State = {
    name: 'helo',
    value: 'world',
};
const stateMachine: StateMachine = (stateValue: State) => {
    logger.info(stateValue);
};

const app = express();
app.use(httpLogger());

app.get('/', (_, res) => {
    res.json({
        ok: true,
    });
});

app.listen(config.get('port'), () => {
    logger.info(
        `Server started at port ${config.get('port')} in ${config.get(
            'env',
        )} mode`,
    );
    stateMachine(state);
});
