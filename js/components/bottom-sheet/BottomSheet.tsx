import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React, {
  useCallback,
  useEffect, useMemo,
  useRef,
  useState,
} from 'react';
import { useDrag } from '@use-gesture/react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { v4 } from 'uuid';
import { HistoryLocationStateType } from './HistoryLocationStateType';

type PropTypes = {
  id?: string;
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  onShowStart?: () => void;
  onShowEnd?: () => void;
  onHideStart?: () => void;
  onHideEnd?: () => void;
  additionalClassName?: string;
  bodyAdditionalClassName?: string;
  isFullHeight?: boolean;
};

const BottomSheet: React.FC<PropTypes> = ({
  id,
  children,
  isVisible,
  show,
  hide,
  onShowStart,
  onShowEnd,
  onHideStart,
  onHideEnd,
  additionalClassName,
  bodyAdditionalClassName,
  isFullHeight,
}) => {
  const uuid = useMemo(() => id ?? v4(), [id]);
  const history = useHistory<HistoryLocationStateType>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const refSheet = useRef<HTMLDivElement>();
  const refSheetContent = useRef<HTMLDivElement>();
  const [heightLocal, setHeightLocal] = useState<number>(0);
  const controls = useAnimation();
  const paddingTop = 20;

  const isOpenOtherBottomSheet = (): boolean => !!document.querySelector('.bottom-sheet');

  useEffect(() => {
    const unListen = history.listen(({ state }) => {
      const bottomSheetIds = [...(state?.bottomSheetIds || [])];
      const isIncludes = bottomSheetIds.includes(uuid);
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
    const bottomSheetIds = [...(history.location.state?.bottomSheetIds || [])];
    if (bottomSheetIds.includes(uuid)) {
      return;
    }

    bottomSheetIds.push(uuid);
    history.push({
      ...history.location,
      state: {
        ...history.location.state,
        bottomSheetIds,
      },
    });
  };

  const removeId = () => {
    const bottomSheetIds = [...(history.location.state?.bottomSheetIds || [])];
    if (!bottomSheetIds.includes(uuid)) {
      return;
    }

    history.goBack();
  };

  const calculateHeight = (): number => {
    if (!refSheetContent.current) {
      return 0;
    }

    if (!refSheetContent.current.dataset.inititalHeight) {
      refSheetContent.current.dataset.inititalHeight = String(refSheetContent.current.clientHeight);
    }
    refSheetContent.current.style.height = 'initial';

    let minHeight = Math.min(refSheetContent.current.clientHeight, window.innerHeight);
    if (isFullHeight) {
      minHeight = window.innerHeight;
    }

    if (minHeight >= Math.min(window.innerHeight, refSheet.current.clientHeight)) {
      minHeight -= paddingTop;
    }
    refSheetContent.current.style.height = `${minHeight}px`;

    return Math.min(
      refSheet.current.clientHeight,
      refSheetContent.current.clientHeight,
      window.innerHeight,
    );
  };

  const handlerResize = useCallback(() => {
    setHeightLocal(calculateHeight());
  }, [isFullHeight]);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    setHeightLocal(calculateHeight());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, [children, isMounted, isFullHeight]);

  const handlerOpenStart = (triggerEvent: boolean = true) => {
    if (triggerEvent && onShowStart) {
      onShowStart();
    }

    setId();
    document.body.style.overflow = 'hidden';
  };

  const handlerOpenEnd = (triggerEvent: boolean = true) => {
    setIsOpen(true);
    if (triggerEvent && onShowEnd) {
      onShowEnd();
    }
  };

  const handlerCloseStart = () => {
    if (onHideStart) {
      onHideStart();
    }
  };

  const handlerCloseEnd = () => {
    if (onHideEnd) {
      onHideEnd();
    }

    removeId();
    setIsOpen(false);
    setIsMounted(false);
    if (!isOpenOtherBottomSheet()) {
      document.body.style.overflow = null;
    }
  };

  const openSheet = (triggerEvent: boolean = true, isSpring: boolean = false) => {
    handlerOpenStart(triggerEvent);

    controls.start({
      y: -heightLocal,
      transition: {
        type: isSpring ? 'spring' : 'tween',
      },
    }).then(() => {
      handlerOpenEnd(triggerEvent);
    });
  };

  const closeSheet = () => {
    handlerCloseStart();
    controls.start({
      y: 0,
      transition: {
        type: 'tween',
      },
    }).then(() => {
      handlerCloseEnd();
    });
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    openSheet(false);
  }, [heightLocal, isOpen]);

  useEffect(() => {
    if (isVisible && !isMounted) {
      setIsMounted(true);
      openSheet();
    } else if (!isVisible && isMounted) {
      closeSheet();
    }
  }, [isVisible, isMounted]);

  const bind = useDrag(
    ({
      last,
      movement: [, my],
      cancel,
    }) => {
      if (my < -70) {
        cancel();
      }

      if (last) {
        if (my > heightLocal * 0.33) {
          hide();
        } else {
          openSheet(false, true);
        }
      } else {
        controls.start({
          y: -heightLocal + my,
          transition: {
            type: 'spring',
          },
        }).then();
      }
    },
    {
      from: () => [-heightLocal, 0],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  );

  if (!isMounted) {
    return null;
  }

  // noinspection TypeScriptValidateTypes
  return ReactDOM.createPortal(
    (
      <>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="bottom-sheet-overlay"
              onClick={() => {
                hide();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <motion.div
          ref={refSheet}
          className={classNames('bottom-sheet', additionalClassName)}
          animate={controls}
        >
          <div className="bottom-sheet__content" ref={refSheetContent}>
            <div {...bind()} className="bottom-sheet__header" />
            <div className={classNames('bottom-sheet__body', bodyAdditionalClassName)}>
              {children}
            </div>
          </div>
        </motion.div>
      </>
    ),
    document.body,
  );
};

export { BottomSheet };
