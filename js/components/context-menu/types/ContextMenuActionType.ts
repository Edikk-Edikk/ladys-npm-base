import { CSSProperties } from 'react';

type ContextMenuActionType = {
  title: string;
  onClick: () => void;
  styles?: CSSProperties;
};

export { ContextMenuActionType };
