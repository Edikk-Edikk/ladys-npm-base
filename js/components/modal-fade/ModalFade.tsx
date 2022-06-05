import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import React, { useCallback, useEffect, useMemo } from 'react';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';
import { useHistory } from 'react-router';
import { v4 } from 'uuid';
import { HistoryLocationStateType } from './HistoryLocationStateType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faXmark from '@fortawesome/free-solid-svg-icons/faXmark';

type PropsType = {
  id?: string;
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
  const uuid = useMemo(() => id ?? v4(), [id]);
  const history = useHistory<HistoryLocationStateType>();

  useEffect(() => {
    const unListen = history.listen(({ state }) => {
      const modalFadeIds = [...(state?.modalFadeIds || [])];
      const isIncludes = modalFadeIds.includes(uuid);
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
    if (modalFadeIds.includes(uuid)) {
      return;
    }

    modalFadeIds.push(uuid);
    history.push({
      ...history.location,
      state: {
        ...history.location.state,
        modalFadeIds,
      },
    });
  };

  const removeId = () => {
    const modalFadeIds = [...(history.location.state?.modalFadeIds || [])];
    if (!modalFadeIds.includes(uuid)) {
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
      <button type="button" className="modal-fade__close" onClick={handlerClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    );
  };

  if (typeof document === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    (
      <CSSTransition
        in={isVisible}
        timeout={300}
        unmountOnExit
        classNames={{
          enterActive: 'modal-fade-enter-active',
          exitActive: 'modal-fade-exit-active',
        }}
        onEnter={handlerEnter}
        onExit={handlerExit}
        onExited={handlerExited}
      >
        <div className="modal-fade">
          {renderClose()}
          {children}
        </div>
      </CSSTransition>
    ),
    document.body,
  );
};

export { ModalFade };
