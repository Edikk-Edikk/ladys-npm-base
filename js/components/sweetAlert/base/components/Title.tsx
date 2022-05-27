import React from 'react';
import { SweetAlertVariant } from '../types';
import classNames from 'classnames';
import sweetAlertCss from '../../assets/sweet-alert.module.scss';
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
        sweetAlertCss.sweetAlert__title,
        { [sweetAlertCss.sweetAlert__title_error]: variant === TYPE_ERROR }
      )}
    >
      {children}
    </h2>
  );
};

export { Title };
