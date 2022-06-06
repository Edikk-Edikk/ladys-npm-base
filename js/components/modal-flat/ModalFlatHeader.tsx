import React, { FC } from 'react';
import { useModalFlatContext } from './hooks';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

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
        <FontAwesomeIcon icon={solid('xmark')} />
      </button>
    </div>
  );
};

export { ModalFlatHeader };
