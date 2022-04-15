import { ItemType } from '../types';
import { FSAWithPayloadType } from '../../redux';
import { ShowPayloadType } from './types';
import { NOTIFIER_SHOW } from '../constants';


const notifierShow = (item: ItemType): FSAWithPayloadType<ShowPayloadType> => ({
  type: NOTIFIER_SHOW,
  payload: {
    item,
  },
});

export { notifierShow };
