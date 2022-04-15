import { ReactNode } from 'react';
import { Variant } from './Variant';

type ItemType = {
  id: string;
  message: ReactNode,
  isVisible?: boolean;
  timeout?: number,
  variant?: Variant,
};

export { ItemType };
