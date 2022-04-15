import React from 'react';
import { ButtonProps } from 'react-bootstrap/Button';
import { Variant } from './Variant';

type OptionalPropsType = {
  show?: boolean;
  type?: Variant;
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
  allowEscape?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export { OptionalPropsType };
