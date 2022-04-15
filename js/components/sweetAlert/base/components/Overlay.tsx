import React, { KeyboardEvent } from 'react';

type PropsType = {
  show: boolean;
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

const Overlay: React.FC<PropsType> = ({
  children,
  show,
  onKeyDown,
}) => (show ? (
  <div
    role="presentation"
    className="sweet-alert-overlay"
    onKeyDown={onKeyDown}
  >
    {children}
  </div>
) : (
  <div role="presentation" onKeyDown={(e) => onKeyDown(e)}>
    {children}
  </div>
));

export { Overlay };
