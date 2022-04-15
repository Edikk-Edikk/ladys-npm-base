import { OptionalPropsType } from './OptionalPropsType';

type PropsType = OptionalPropsType & {
  onClose: () => void;
  onTransitionExited?: () => void;
  onTransitionEnter?: () => void;
}

export { PropsType };
