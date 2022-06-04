import React, { FC } from 'react';
import modalFlatFooterCss from './assets/modal-flat-footer.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const ModalFlatFooter: FC = ({
  children,
}) => {
  useStyles(modalFlatFooterCss);
  return (
    <div className={modalFlatFooterCss.modalFlatFooter}>
      {children}
    </div>
  );
};

export { ModalFlatFooter };
