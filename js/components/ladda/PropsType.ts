import { Style } from './style';

type PropsType = {
  className?: string,
  loading: boolean,
  disabled?: boolean,
  'data-color'?: string,
  'data-size'?: string,
  'data-style'?: Style,
  'data-spinner-size'?: number,
  'data-spinner-color'?: string,
  'data-spinner-lines'?: number,
  onClick?: (e) => void,
};

export { PropsType };
