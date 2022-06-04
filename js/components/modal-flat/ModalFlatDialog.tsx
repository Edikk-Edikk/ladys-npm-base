import React, { FC } from 'react';
import modalFlatDialogCss from './assets/modal-flat-dialog.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const ModalFlatDialog: FC = ({
  children,
}) => {
  useStyles(modalFlatDialogCss);
  return (
    <div className={modalFlatDialogCss.modalFlatDialog}>
      {children}
    </div>
  );
};

export { ModalFlatDialog };
