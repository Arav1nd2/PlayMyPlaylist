export interface State {
  name: string;
  value: string;
}

export type StateMachine = (state: State) => void;

export const add = (a: number, b: number) => a + b + 5;
