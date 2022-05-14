import React, { FC } from 'react';
import modalFlatFooterCss from './assets/modal-flat-footer.module.scss';

const ModalFlatFooter: FC = ({
  children,
}) => (
  <div className={modalFlatFooterCss.modalFlatFooter}>
    {children}
  </div>
);

export { ModalFlatFooter };
