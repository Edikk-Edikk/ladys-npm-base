import { Action } from 'redux';

type ActionWithPayloadType<T extends object = {}> = Action & {
  payload: T,
};

export { ActionWithPayloadType };
