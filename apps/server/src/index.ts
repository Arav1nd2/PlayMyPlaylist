import { State, StateMachine } from '@pmp/constants';
import express from 'express';

const state: State = {
  name: 'helo',
  value: 'world',
};
const stateMachine: StateMachine = (stateValue: State) => {
  console.log(stateValue);
};

const app = express();

app.get('/', (_, res) => {
  res.json({
    ok: true,
  });
});

app.listen(8888, () => {
  console.log('server started at port 8888');
  stateMachine(state);
});
