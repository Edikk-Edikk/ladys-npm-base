import { ReactNode } from 'react';
import { OptionalPropsType } from '../base';

type StateSweetAlertType = OptionalPropsType & {
  content?: () => ReactNode,
}

export { StateSweetAlertType };
