import { ReactNode } from 'react';
import { NotifierVariant } from './NotifierVariant';

type ItemType = {
  id: string;
  message: ReactNode,
  isVisible?: boolean;
  timeout?: number,
  variant?: NotifierVariant,
};

export { ItemType };
