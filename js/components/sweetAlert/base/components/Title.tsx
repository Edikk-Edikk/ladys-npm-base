import React from 'react';
import { SweetAlertVariant } from '../types/SweetAlertVariant';
import classNames from 'classnames';
import { TYPE_ERROR } from '../constants';

type PropsType = {
  variant: SweetAlertVariant;
}

const Title: React.FC<PropsType> = ({ variant, children }) => {
  if (!children) {
    return null;
  }

  return (
    <h2
      className={classNames(
        'sweet-alert__title',
        { 'sweet-alert__title_error': variant === TYPE_ERROR }
      )}
    >
      {children}
    </h2>
  );
};

export { Title };
