import React, { FC } from 'react';
import modalFlatBodyCss from './assets/modal-flat-body.module.scss';

const ModalFlatBody: FC = ({
  children,
}) => (
  <div className={modalFlatBodyCss.modalFlatBody}>
    {children}
  </div>
);

export { ModalFlatBody };
