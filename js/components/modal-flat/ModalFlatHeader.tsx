import React, { FC } from 'react';
import { useModalFlatContext } from './hooks';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faXmark from '@fortawesome/free-solid-svg-icons/faXmark';

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
    <div className={classNames('modal-flat-header', additionalClassName)}>
      <div className="modal-flat-header__content">
        {children}
      </div>
      <button type="button" className="modal-flat-header__close-icon" onClick={handlerClickOnCloseIcon}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export { ModalFlatHeader };
