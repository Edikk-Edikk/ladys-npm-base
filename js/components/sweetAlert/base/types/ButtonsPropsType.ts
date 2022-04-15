import { OptionalPropsType } from './OptionalPropsType';

type ButtonsPropsType = Pick<OptionalPropsType,
  'type'
  | 'confirmBtnText'
  | 'confirmBtnVariant'
  | 'confirmBtnClassName'
  | 'confirmBtnIsVisible'
  | 'confirmBtnFocus'
  | 'cancelBtnText'
  | 'cancelBtnVariant'
  | 'cancelBtnClassName'
  | 'cancelBtnIsVisible'
  | 'cancelBtnFocus'
  | 'reverseButtons'
  | 'btnSize'
  | 'disabled'
  | 'onConfirm'
  | 'onCancel'>

export { ButtonsPropsType };
