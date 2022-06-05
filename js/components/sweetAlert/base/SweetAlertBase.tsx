import React, { ReactNode, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import useOnclickOutside from 'react-cool-onclickoutside';
import { DefaultPropsType } from './types/DefaultPropsType';
import { TYPE_DEFAULT, TYPE_ERROR } from './constants';
import { PropsType } from './types/PropsType';
import { Title } from './components/Title';
import { Overlay } from './components/Overlay';
import { Content } from './components/Content';
import { Button } from './components/Button';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';

const defaultProps: DefaultPropsType = {
  type: TYPE_DEFAULT,
  showCloseBtn: true,
  confirmBtnVariant: 'primary',
  confirmBtnIsVisible: true,
  confirmBtnFocus: true,
  cancelBtnVariant: 'secondary',
  cancelBtnIsVisible: true,
  cancelBtnFocus: false,
  btnSize: 'lg',
  reverseButtons: false,
  disabled: false,
  closeOnClickOutside: true,
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
  disabled,
  closeOnClickOutside,
  onClose,
  onConfirm,
  onCancel,
  onTransitionEnter,
  onTransitionExited,
}) => {
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(show);
  const [isEntered, setIsEntered] = useState(false);

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

  const handlerTransitionEnter = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth()}px`;

    setIsVisibleOverlay(true);
    if (onTransitionEnter) {
      onTransitionEnter();
    }
  };

  const handlerTransitionEntered = () => {
    setIsEntered(true);
  };

  const handlerTransitionExit = () => {
    setIsEntered(false);
  };

  const handlerTransitionExited = () => {
    document.body.style.overflow = null;
    document.body.style.paddingRight = null;

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
        'sweet-alert__actions',
        { 'sweet-alert__actions_error': type === TYPE_ERROR }
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
        isEntered={isEntered}
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
        isEntered={isEntered}
      />
    </div>
  );

  const renderHeader = (): ReactNode => {
    if (!title) {
      return null;
    }

    return (
      <div
        className={classNames(
          'sweet-alert__header',
          { 'sweet-alert__header_error': type === TYPE_ERROR }
        )}
      >
        <Title variant={type}>{title}</Title>
      </div>
    );
  };

  return (
    <Overlay show={isVisibleOverlay}>
      <CSSTransition
        in={show}
        timeout={300}
        unmountOnExit
        classNames={{
          enterActive: 'sweet-alert-enter-active',
          exitActive: 'sweet-alert-exit-active',
        }}
        onEnter={handlerTransitionEnter}
        onEntered={handlerTransitionEntered}
        onExit={handlerTransitionExit}
        onExited={handlerTransitionExited}
      >
        <div
          ref={ref}
          role="presentation"
          onClick={handlerClickInside}
          className={classNames(
            'sweet-alert',
            { 'sweet-alert_error': type === TYPE_ERROR }
          )}
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
