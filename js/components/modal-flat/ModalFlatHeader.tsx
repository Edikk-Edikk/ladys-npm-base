import React, { FC } from 'react';
// @ts-ignore
import XmarkSvg from '@fortawesome/fontawesome-free/svgs/solid/xmark.svg';
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
        <XmarkSvg className="svg-icon" />
      </button>
    </div>
  );
};

export { ModalFlatHeader };
