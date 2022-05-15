import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useModalFlatContext } from './hooks';
import modalFlatHeaderCss from './assets/modal-flat-header.module.scss';
import classNames from 'classnames';

type PropsType = {
  additionalClassName?: string;
};

const ModalFlatHeader: FC<PropsType> = ({
  children,
  additionalClassName,
}) => {
  const { hide } = useModalFlatContext();

  const handlerClickOnCloseIcon = () => {
    hide();
  };

  return (
    <div className={classNames(modalFlatHeaderCss.modalFlatHeader, additionalClassName)}>
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
