import React from 'react';
import classNames from 'classnames';

type PropsType = {
  show: boolean;
}

const Overlay: React.FC<PropsType> = ({
  children,
  show,
}) => (
  <div role="presentation" className={classNames({ 'sweet-alert-overlay': show })}>
    {children}
  </div>
);

export { Overlay };
