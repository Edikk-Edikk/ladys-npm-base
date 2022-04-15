import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import useOnclickOutside from 'react-cool-onclickoutside';
import { DefaultPropsType } from './types';
import { TYPE_DEFAULT } from './constants';
import { PropsType } from './types';
import { Button, Content, Overlay, Title } from './components';

const defaultProps: DefaultPropsType = {
  type: TYPE_DEFAULT,
  showCloseBtn: true,
  confirmBtnVariant: 'primary',
  confirmBtnClassName: 'min-w-155',
  confirmBtnIsVisible: true,
  confirmBtnFocus: true,
  cancelBtnVariant: 'secondary',
  cancelBtnClassName: 'min-w-155',
  cancelBtnIsVisible: true,
  cancelBtnFocus: false,
  btnSize: 'lg',
  reverseButtons: false,
  disabled: false,
  closeOnClickOutside: true,
  allowEscape: true,
};

const SweetAlertBase: React.FC<PropsType> = ({
  children,
  show,
  type,
  title,
  message,
  showCloseBtn,
  confirmBtnText,
  confirmBtnVariant,
  confirmBtnClassName,
  confirmBtnIsVisible,
  confirmBtnFocus,
  confirmBtnLoading,
  confirmBtnDisabled,
  cancelBtnText,
  cancelBtnVariant,
  cancelBtnClassName,
  cancelBtnIsVisible,
  cancelBtnFocus,
  cancelBtnLoading,
  btnSize,
  reverseButtons,
  disabled,
  closeOnClickOutside,
  allowEscape,
  onClose,
  onConfirm,
  onCancel,
  onTransitionEnter,
  onTransitionExited,
}) => {
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);

  useLayoutEffect(() => {
    document.body.classList.remove('sweetalert-overflow-hidden');

    return () => {
      document.body.classList.remove('sweetalert-overflow-hidden');
    };
  });

  const getConfirmBtnText = () => confirmBtnText || 'Ok';

  const getCancelBtnText = () => cancelBtnText || 'Cancel';

  const handlerConfirm = () => (onConfirm ? onConfirm() : onClose());

  const handlerCancel = () => (onCancel ? onCancel() : onClose());

  const handlerClickOutside = () => {
    if (closeOnClickOutside) {
      onClose();
    }
  };

  const ref = useOnclickOutside(handlerClickOutside, {
    disabled: !show,
  });

  const handlerClickInside = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlerKeyDown = (e) => {
    if (disabled) {
      return;
    }

    if (e.key === 'Escape' && allowEscape) {
      e.stopPropagation();
      onClose();
    }
  };

  const handlerTransitionEnter = () => {
    setIsVisibleOverlay(true);
    if (onTransitionEnter) {
      onTransitionEnter();
    }
  };

  const handlerTransitionExited = () => {
    setIsVisibleOverlay(false);
    if (onTransitionExited) {
      onTransitionExited();
    }
  };

  const renderContent = (): ReactNode => message || children;

  const renderCloseButton = (): ReactNode => {
    if (!showCloseBtn) {
      return null;
    }

    return <button aria-label="close" type="button" className="sweet-alert__close" onClick={onClose} />;
  };

  const renderButtons = (): ReactNode => (
    <div
      className={classNames(
        `sweet-alert__actions sweet-alert__actions_${type}`,
        { alert__actions_reverse: reverseButtons },
      )}
    >
      <Button
        text={getCancelBtnText()}
        variant={cancelBtnVariant}
        className={cancelBtnClassName}
        isVisible={cancelBtnIsVisible}
        focus={cancelBtnFocus}
        size={btnSize}
        disabled={disabled}
        onClick={handlerCancel}
        loading={cancelBtnLoading}
      />
      <Button
        text={getConfirmBtnText()}
        variant={confirmBtnVariant}
        className={confirmBtnClassName}
        isVisible={confirmBtnIsVisible}
        focus={confirmBtnFocus}
        size={btnSize}
        disabled={disabled || confirmBtnDisabled}
        onClick={handlerConfirm}
        loading={confirmBtnLoading}
      />
    </div>
  );

  const renderHeader = (): ReactNode => {
    if (!title) {
      return null;
    }

    return (
      <div className={`sweet-alert__header sweet-alert__header_${type}`}>
        <Title variant={type}>{title}</Title>
      </div>
    );
  };

  return (
    <Overlay
      show={isVisibleOverlay}
      onKeyDown={handlerKeyDown}
    >
      <CSSTransition
        in={show}
        timeout={300}
        unmountOnExit
        classNames="sweet-alert"
        onEnter={handlerTransitionEnter}
        onExited={handlerTransitionExited}
      >
        <div
          ref={ref}
          role="presentation"
          onKeyDown={handlerKeyDown}
          onClick={handlerClickInside}
          className={`sweet-alert sweet-alert_${type}`}
        >
          {renderCloseButton()}
          {renderHeader()}
          <Content variant={type}>
            {renderContent()}
          </Content>
          {renderButtons()}
        </div>
      </CSSTransition>
    </Overlay>
  );
};

SweetAlertBase.defaultProps = defaultProps;

export { SweetAlertBase };
