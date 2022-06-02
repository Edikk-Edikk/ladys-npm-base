import {
  SWEET_ALERT_HIDE,
  SWEET_ALERT_HIDE_COMPLETE,
  SWEET_ALERT_SHOW,
  SWEET_ALERT_UPDATE,
} from '../constants';
import { ActionWithPayloadType } from '../../redux';
import { StateSweetAlertType } from '../types/StateSweetAlertType';

const stateDefault = {
  show: false,
  title: '',
};

const reducerSweetAlert = (state = stateDefault, action: ActionWithPayloadType): StateSweetAlertType => {
  switch (action.type) {
    case SWEET_ALERT_SHOW:
      // noinspection TypeScriptValidateTypes
      return {
        ...stateDefault,
        ...action.payload,
      };
    case SWEET_ALERT_UPDATE:
      // noinspection TypeScriptValidateTypes
      return {
        ...state,
        ...action.payload,
      };
    case SWEET_ALERT_HIDE:
      // noinspection TypeScriptValidateTypes
      return {
        ...state,
        ...action.payload,
      };
    case SWEET_ALERT_HIDE_COMPLETE:
      return {
        ...stateDefault,
      };
    default:
      return state;
  }
};

export { reducerSweetAlert };
