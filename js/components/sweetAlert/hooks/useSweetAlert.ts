import { useDispatch } from 'react-redux';
import {
  sweetAlertErrorShow,
  sweetAlertShow,
  sweetAlertSuccessShow,
  sweetAlertUpdate,
} from '../actions/show';
import { StateSweetAlertType } from '../types/StateSweetAlertType';
import { OptionalPropsType } from '../base/types/OptionalPropsType';
import { sweetAlertHide } from '../actions/hide';

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
