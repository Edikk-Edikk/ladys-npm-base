import { ItemType } from '../types/ItemType';
import { FSAWithPayloadType } from '../../redux';
import { ShowPayloadType } from './types/ShowPayloadType';
import { NOTIFIER_SHOW } from '../constants';


const notifierShow = (item: ItemType): FSAWithPayloadType<ShowPayloadType> => ({
  type: NOTIFIER_SHOW,
  payload: {
    item,
  },
});

export { notifierShow };
