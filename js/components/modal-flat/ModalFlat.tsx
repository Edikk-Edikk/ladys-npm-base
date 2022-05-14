import React, {
  forwardRef,
  useCallback, useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';
import { useHistory } from 'react-router';
import { ModalFlatType } from './types';
import { ModalFlatContextType } from './context';
import { ModalFlatContext } from './context';
import { ModalFlatHistoryLocationStateType } from './types';
import modalFlatCss from './assets/modal-flat.module.scss';
import modalFlatOverlayCss from './assets/modal-flat-overlay.module.scss';

type PropsType = {
  id: string;
};

const ModalFlat = forwardRef<ModalFlatType, PropsType>(({
  id,
  children,
}, forwardedRef) => {
  globalThis.console.log(id);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const history = useHistory<ModalFlatHistoryLocationStateType>();

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  useImperativeHandle<ModalFlatType, ModalFlatType>(forwardedRef, () => ({
    show,
    hide,
  }), []);

  useEffect(() => {
    const unListen = history.listen(({ state }) => {
      const modalFlatIds = [...(state?.modalFlatIds || [])];
      const isIncludes = modalFlatIds.includes(id);
      if (isIncludes && !isVisible) {
        show();
      } else if (!isIncludes && isVisible) {
        hide();
      }
    });

    return () => {
      unListen();
    };
  }, [isVisible]);

  const setId = () => {
    const modalFlatIds = [...(history.location.state?.modalFlatIds || [])];
    if (modalFlatIds.includes(id)) {
      return;
    }

    modalFlatIds.push(id);
    history.push({
      state: {
        ...history.location.state,
        modalFlatIds,
      },
    });
  };

  const removeId = () => {
    const modalFlatIds = [...(history.location.state?.modalFlatIds || [])];
    if (!modalFlatIds.includes(id)) {
      return;
    }

    history.goBack();
  };

  const handlerClickOnOverlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    hide();
  }, []);

  const handlerEnter = () => {
    setId();

    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.paddingRight = `${scrollbarWidth()}px`;
  };

  const handlerExited = () => {
    removeId();

    document.body.style.height = null;
    document.body.style.overflow = null;
    document.body.style.position = null;
    document.body.style.paddingRight = null;
  };

  const modalFlatContextValue: ModalFlatContextType = {
    hide,
  };

  const renderContent = () => (
    <ModalFlatContext.Provider value={modalFlatContextValue}>
      <CSSTransition
        in={isVisible}
        timeout={300}
        unmountOnExit
        classNames={{
          enterActive: modalFlatOverlayCss.modalFlatOverlayEnterActive,
          exitActive: modalFlatOverlayCss.modalFlatOverlayExitActive,
        }}
      >
        <div
          role="presentation"
          className={modalFlatOverlayCss.modalFlatOverlay}
          onClick={handlerClickOnOverlay}
        />
      </CSSTransition>
      <CSSTransition
        in={isVisible}
        timeout={300}
        unmountOnExit
        classNames={{
          enterActive: modalFlatCss.modalFlatEnterActive,
          exitActive: modalFlatCss.modalFlatExitActive,
        }}
        onEnter={handlerEnter}
        onExited={handlerExited}
      >
        <div className={modalFlatCss.modalFlat}>
          {children}
        </div>
      </CSSTransition>
    </ModalFlatContext.Provider>
  );

  return ReactDOM.createPortal(
    renderContent(),
    document.body,
  );
});

export { ModalFlat };
