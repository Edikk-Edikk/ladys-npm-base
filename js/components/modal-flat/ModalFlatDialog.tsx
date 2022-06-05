import React, { FC } from 'react';

const ModalFlatDialog: FC = ({
  children,
}) => (
  <div className="modal-flat-dialog">
    {children}
  </div>
);

export { ModalFlatDialog };
