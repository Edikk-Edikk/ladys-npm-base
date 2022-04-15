import { SWEET_ALERT_HIDE, SWEET_ALERT_HIDE_COMPLETE } from '../constants';

const sweetAlertHide = () => ({
  type: SWEET_ALERT_HIDE,
  payload: {
    show: false,
  },
});

const sweetAlertHideComplete = () => ({
  type: SWEET_ALERT_HIDE_COMPLETE,
});

export { sweetAlertHide, sweetAlertHideComplete };
