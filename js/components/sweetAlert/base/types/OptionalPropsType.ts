import React from 'react';
import { ButtonProps } from 'react-bootstrap/Button';
import { SweetAlertVariant } from './SweetAlertVariant';

type OptionalPropsType = {
  show?: boolean;
  type?: SweetAlertVariant;
  title?: string | number;
  message?: string,
  showCloseBtn?: boolean;
  confirmBtnText?: React.ReactNode | string;
  confirmBtnVariant?: ButtonProps['variant'];
  confirmBtnClassName?: string,
  confirmBtnIsVisible?: boolean;
  confirmBtnFocus?: boolean;
  confirmBtnLoading?: boolean;
  confirmBtnDisabled?: boolean;
  cancelBtnText?: React.ReactNode | string;
  cancelBtnVariant?: ButtonProps['variant'];
  cancelBtnClassName?: string,
  cancelBtnIsVisible?: boolean;
  cancelBtnFocus?: boolean;
  cancelBtnLoading?: boolean;
  btnSize?: ButtonProps['size'];
  reverseButtons?: boolean;
  disabled?: boolean;
  closeOnClickOutside?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export { OptionalPropsType };
