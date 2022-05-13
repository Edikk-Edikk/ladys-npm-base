import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import React, { useCallback, useEffect } from 'react';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { HistoryLocationStateType } from './HistoryLocationStateType';
// @ts-ignore
import modalFadeCss from './modal-fade.module.scss';

type PropsType = {
  id: string;
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  close?: boolean;
};

const ModalFade: React.FC<PropsType> = ({
  id,
  isVisible,
  show,
  hide,
  children,
  close,
}) => {
  const history = useHistory<HistoryLocationStateType>();

  useEffect(() => {
    const unListen = history.listen(({ state }) => {
      const modalFadeIds = [...(state?.modalFadeIds || [])];
      const isIncludes = modalFadeIds.includes(id);
      if (isIncludes && !isVisible) {
        show();
      } else if (!isIncludes && isVisible) {
        hide();
      }
    });

    return () => {
      unListen();
    };
  }, [show, hide, isVisible]);

  const setId = () => {
    const modalFadeIds = [...(history.location.state?.modalFadeIds || [])];
    if (modalFadeIds.includes(id)) {
      return;
    }

    modalFadeIds.push(id);
    history.push({
      state: {
        ...history.location.state,
        modalFadeIds,
      },
    });
  };

  const removeId = () => {
    const modalFadeIds = [...(history.location.state?.modalFadeIds || [])];
    if (!modalFadeIds.includes(id)) {
      return;
    }

    history.goBack();
  };

  const handlerKeydown = useCallback((e) => {
    if (e.key === 'Escape') {
      hide();
    }
  }, []);

  const handlerEnter = () => {
    setId();

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.paddingRight = `${scrollbarWidth()}px`;

    document.addEventListener('keydown', handlerKeydown);
  };

  const handlerExit = () => {
    removeId();

    document.removeEventListener('keydown', handlerKeydown);
  };

  const handlerExited = () => {
    document.body.style.overflow = null;
    document.body.style.position = null;
    document.body.style.paddingRight = null;
  };

  const handlerClose = () => {
    hide();
  };

  const renderClose = () => {
    if (!close) {
      return null;
    }

    return (
      <button type="button" className={modalFadeCss.modalFade__close} onClick={handlerClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    );
  };

  const renderContent = () => (
    <CSSTransition
      in={isVisible}
      timeout={300}
      unmountOnExit
      classNames={{
        enterActive: modalFadeCss.modalFadeEnterActive,
        exitActive: modalFadeCss.modalFadeExitActive,
      }}
      onEnter={handlerEnter}
      onExit={handlerExit}
      onExited={handlerExited}
    >
      <div className={modalFadeCss.modalFade}>
        {renderClose()}
        {children}
      </div>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    renderContent(),
    document.body,
  );
};

export { ModalFade };
