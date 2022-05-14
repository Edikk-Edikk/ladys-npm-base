import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useModalFlatContext } from './hooks';
import modalFlatHeaderCss from './assets/modal-flat-header.module.scss';

const ModalFlatHeader: FC = ({
  children,
}) => {
  const { hide } = useModalFlatContext();

  const handlerClickOnCloseIcon = () => {
    hide();
  };

  return (
    <div className={modalFlatHeaderCss.modalFlatHeader}>
      <div className={modalFlatHeaderCss.modalFlatHeader__content}>
        {children}
      </div>
      <button type="button" className={modalFlatHeaderCss.modalFlatHeader__closeIcon} onClick={handlerClickOnCloseIcon}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export { ModalFlatHeader };
