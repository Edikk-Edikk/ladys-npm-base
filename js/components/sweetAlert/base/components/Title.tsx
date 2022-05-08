import React from 'react';
import { SweetAlertVariant } from '../types';

type PropsType = {
  variant: SweetAlertVariant;
}

const Title: React.FC<PropsType> = ({ variant, children }) => {
  if (!children) {
    return null;
  }

  return (
    <h2 className={`sweet-alert__title sweet-alert__title_${variant}`}>
      {children}
    </h2>
  );
};

export { Title };
