import React, { FC } from 'react';
// @ts-ignore
import XmarkSvg from '@fortawesome/fontawesome-free/svgs/solid/xmark.svg';
import { useModalFlatContext } from './hooks';
import classNames from 'classnames';
import { SvgIcon } from '../svg-icon/SvgIcon';

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
        <SvgIcon icon={XmarkSvg} />
      </button>
    </div>
  );
};

export { ModalFlatHeader };
