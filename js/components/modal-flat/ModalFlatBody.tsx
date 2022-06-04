import React, { FC } from 'react';
import modalFlatBodyCss from './assets/modal-flat-body.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const ModalFlatBody: FC = ({
  children,
}) => {
  useStyles(modalFlatBodyCss);
  return (
    <div className={modalFlatBodyCss.modalFlatBody}>
      {children}
    </div>
  );
};

export { ModalFlatBody };
