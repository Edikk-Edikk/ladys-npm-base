import React from 'react';
import sweetAlertCss from '../../assets/sweet-alert.module.scss';

type PropsType = {
  show: boolean;
}

const Overlay: React.FC<PropsType> = ({
  children,
  show,
}) => (show ? (
  <div role="presentation" className={sweetAlertCss.sweetAlertOverlay}>
    {children}
  </div>
) : (
  <div role="presentation">
    {children}
  </div>
));

export { Overlay };
