import { ReactNode } from 'react';
import { OptionalPropsType } from '../base/types/OptionalPropsType';

type StateSweetAlertType = OptionalPropsType & {
  content?: () => ReactNode,
}

export { StateSweetAlertType };
