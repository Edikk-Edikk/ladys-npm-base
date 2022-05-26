import { OptionalPropsType } from './OptionalPropsType';

type DefaultPropsType = Pick<OptionalPropsType,
  'type'
  | 'showCloseBtn'
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
  | 'btnSize'
  | 'reverseButtons'
  | 'disabled'
  | 'closeOnClickOutside'>

export { DefaultPropsType };
