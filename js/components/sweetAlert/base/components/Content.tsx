import React from 'react';
import { SweetAlertVariant } from '../types';

type PropsType = {
  variant: SweetAlertVariant;
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
