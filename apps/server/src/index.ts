import { State, StateMachine } from '@pmp/constants';
import express from 'express';
import { httpLogger, logger } from './services/logger';

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

app.listen(8888, () => {
    logger.info('server started at port 8888');
    stateMachine(state);
});
