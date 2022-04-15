import { FSAWithPayloadType } from '../../redux';
import { HidePayloadType } from './types';
import { NOTIFIER_HIDE } from '../constants';

const notifierHide = (id: string, force: boolean): FSAWithPayloadType<HidePayloadType> => ({
  type: NOTIFIER_HIDE,
  payload: {
    id,
    force,
  },
});

export { notifierHide };
