import React from 'react';
import { SweetAlertVariant } from '../types/SweetAlertVariant';
import classNames from 'classnames';
import { TYPE_ERROR } from '../constants';

type PropsType = {
  variant: SweetAlertVariant;
}

const Content: React.FC<PropsType> = ({ variant, children }) => {
  if (!children) {
    return null;
  }

  return (
    <div
      className={classNames(
        'sweet-alert__content',
        { 'sweet-alert__content_error': variant === TYPE_ERROR }
      )}
    >
      {children}
    </div>
  );
};

export { Content };
