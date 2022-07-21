import React, {
  forwardRef, MutableRefObject, ReactNode,
  useCallback, useEffect,
  useImperativeHandle, useMemo, useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { scrollbarWidth } from '@xobotyi/scrollbar-width';
import { useHistory } from 'react-router';
import classNames from 'classnames';
import { v4 } from 'uuid';
import { ModalFlatType } from './types';
import { ModalFlatContextType } from './context';
import { ModalFlatContext } from './context';
import { ModalFlatHistoryLocationStateType } from './types';
import { ModalFlatDialog } from './ModalFlatDialog';
import { Subject, Subscription } from 'rxjs';
import canUseDOM from 'can-use-dom';

type PropsType = {
  children: ReactNode,
  id?: string;
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  additionalClassName?: string;
};

const ModalFlat = forwardRef<ModalFlatType, PropsType>(({
  children,
  id,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  additionalClassName,
}, forwardedRef) => {
  const uuid = useMemo(() => id ?? v4(), [id]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const history = useHistory<ModalFlatHistoryLocationStateType>();
  const refHideSubject: MutableRefObject<Subject<void>> = useRef(new Subject<void>());

  const show = () => {
    setIsVisible(true);
  };

  const hide = (): Promise<void> => {
    setIsVisible(false);
    return new Promise((resolve) => {
      const subscription: Subscription = refHideSubject.current.subscribe(() => {
        resolve();
        subscription.unsubscribe();
      });
    });
  };

  useImperativeHandle<ModalFlatType, ModalFlatType>(forwardedRef, () => ({
    show,
    hide,
  }), []);

  useEffect(() => {
    const unListen = history.listen(({ state }) => {
      const modalFlatIds = [...(state?.modalFlatIds || [])];
      const isIncludes = modalFlatIds.includes(uuid);
      if (isIncludes && !isVisible) {
        show();
      } else if (!isIncludes && isVisible) {
        hide().then();
      }
    });

    return () => {
      unListen();
    };
  }, [isVisible]);

  const setId = () => {
    const modalFlatIds = [...(history.location.state?.modalFlatIds || [])];
    if (modalFlatIds.includes(uuid)) {
      return;
    }

    modalFlatIds.push(uuid);
    history.push({
      ...history.location,
      state: {
        ...history.location.state,
        modalFlatIds,
      },
    });
  };

  const removeId = () => {
    const modalFlatIds = [...(history.location.state?.modalFlatIds || [])];
    if (!modalFlatIds.includes(uuid)) {
      return;
    }

    history.goBack();
  };

  const handlerClickOnOverlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    hide().then();
  }, []);

  const handlerEnter = () => {
    if (onEnter) {
      onEnter();
    }

    setId();

    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.paddingRight = `${scrollbarWidth()}px`;
  };

  const handlerEntering = () => {
    if (onEntering) {
      onEntering();
    }
  };

  const handlerEntered = () => {
    if (onEntered) {
      onEntered();
    }
  };

  const handlerExit = () => {
    if (onExit) {
      onExit();
    }
  };

  const handlerExiting = () => {
    if (onExiting) {
      onExiting();
    }
  };

  const handlerExited = () => {
    if (onExited) {
      onExited();
    }

    removeId();

    document.body.style.height = null;
    document.body.style.overflow = null;
    document.body.style.position = null;
    document.body.style.paddingRight = null;

    refHideSubject.current.next();
  };

  const modalFlatContextValue: ModalFlatContextType = {
    hide,
  };

  if (!canUseDOM) {
    return null;
  }

  return ReactDOM.createPortal(
    (
      <ModalFlatContext.Provider value={modalFlatContextValue}>
        <CSSTransition
          in={isVisible}
          timeout={300}
          unmountOnExit
          classNames={{
            enterActive: 'modal-flat-overlay-enter-active',
            exitActive: 'modal-flat-overlay-exit-active',
          }}
        >
          <div
            role="presentation"
            className="modal-flat-overlay"
            onClick={handlerClickOnOverlay}
          />
        </CSSTransition>
        <CSSTransition
          in={isVisible}
          timeout={300}
          unmountOnExit
          classNames={{
            enterActive: 'modal-flat-enter-active',
            exitActive: 'modal-flat-exit-active',
          }}
          onEnter={handlerEnter}
          onEntering={handlerEntering}
          onEntered={handlerEntered}
          onExit={handlerExit}
          onExiting={handlerExiting}
          onExited={handlerExited}
        >
          <div
            className={classNames(
              'modal-flat',
              { 'modal-flat_is-visible': isVisible },
              additionalClassName,
            )}
          >
            <ModalFlatDialog>
              {children}
            </ModalFlatDialog>
          </div>
        </CSSTransition>
      </ModalFlatContext.Provider>
    ),
    document.body,
  );
});

export { ModalFlat };
