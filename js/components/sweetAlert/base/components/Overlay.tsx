import React from 'react';
import sweetAlertCss from '../../assets/sweet-alert.module.scss';
import classNames from 'classnames';

type PropsType = {
  show: boolean;
}

const Overlay: React.FC<PropsType> = ({
  children,
  show,
}) => (
  <div role="presentation" className={classNames({ [sweetAlertCss.sweetAlertOverlay]: show })}>
    {children}
  </div>
);

export { Overlay };
