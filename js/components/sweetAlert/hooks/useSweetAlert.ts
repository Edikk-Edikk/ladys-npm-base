import { useDispatch } from 'react-redux';
import {
  sweetAlertErrorShow,
  sweetAlertShow,
  sweetAlertSuccessShow,
  sweetAlertUpdate,
} from '../actions/show';
import { StateSweetAlertType } from '../types';
import { OptionalPropsType } from '../base';
import { sweetAlertHide } from '../actions';

const useSweetAlert = () => {
  const dispatch = useDispatch();

  const show = (config: StateSweetAlertType) => dispatch(sweetAlertShow(config));

  const showError = (config: StateSweetAlertType) => dispatch(sweetAlertErrorShow(config));

  const showSuccess = (config: StateSweetAlertType) => dispatch(sweetAlertSuccessShow(config));

  const update = (config: OptionalPropsType) => dispatch(sweetAlertUpdate(config));

  const hide = () => dispatch(sweetAlertHide());

  return {
    show,
    showError,
    showSuccess,
    update,
    hide,
  };
};

export { useSweetAlert };
