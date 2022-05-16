import React, { FC } from 'react';
import modalFlatDialogCss from './assets/modal-flat-dialog.module.scss';

const ModalFlatDialog: FC = ({
  children,
}) => (
  <div className={modalFlatDialogCss.modalFlatDialog}>
    {children}
  </div>
);

export { ModalFlatDialog };
