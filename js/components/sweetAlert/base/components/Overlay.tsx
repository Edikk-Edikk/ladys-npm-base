import React from 'react';

type PropsType = {
  show: boolean;
}

const Overlay: React.FC<PropsType> = ({
  children,
  show,
}) => (show ? (
  <div
    role="presentation"
    className="sweet-alert-overlay"
  >
    {children}
  </div>
) : (
  <div role="presentation">
    {children}
  </div>
));

export { Overlay };
