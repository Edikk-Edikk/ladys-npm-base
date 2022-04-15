import { StateNotifierType } from '../types/StateNotifierType';
import { ActionWithPayloadType } from '../../redux';
import { NOTIFIER_HIDE, NOTIFIER_SHOW } from '../constants';
import { ShowPayloadType } from '../actions/types/ShowPayloadType';
import { HidePayloadType } from '../actions/types/HidePayloadType';

const reducerNotifier = (state: StateNotifierType = {
  items: {},
}, action: ActionWithPayloadType): StateNotifierType => {
  switch (action.type) {
    case NOTIFIER_SHOW: {
      const payload = action.payload as ShowPayloadType;

      return {
        ...state,
        items: {
          ...state.items,
          [payload.item.id]: {
            ...payload.item,
            isVisible: true,
          },
        },
      };
    }
    case NOTIFIER_HIDE: {
      const payload = action.payload as HidePayloadType;
      const items = { ...state.items };

      if (payload.force) {
        delete items[payload.id];
      } else {
        items[payload.id].isVisible = false;
      }

      return {
        ...state,
        items,
      };
    }
    default:
      return state;
  }
};

export { reducerNotifier };
