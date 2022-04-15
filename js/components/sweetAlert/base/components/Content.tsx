import React from 'react';
import { Variant } from '../types';

type PropsType = {
  variant: Variant;
}

const Content: React.FC<PropsType> = ({ variant, children }) => {
  if (!children) {
    return null;
  }

  return (
    <div className={`sweet-alert__content sweet-alert__content_${variant}`}>
      {children}
    </div>
  );
};

export { Content };
