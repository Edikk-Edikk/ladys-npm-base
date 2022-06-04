import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ItemType } from '../types/ItemType';
import { NotifierVariant } from '../types/NotifierVariant';
import { useNotifier } from '../hooks/useNotifier';
import notifierCss from '../assets/notifier.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const defaultProps = {
  timeout: 3000,
  variant: NotifierVariant.black,
};

const Item: React.FC<Required<ItemType>> = ({
  id,
  message,
  isVisible,
  timeout,
  variant,
}) => {
  useStyles(notifierCss);
  const { notifierHide } = useNotifier();
  const timeoutId = useRef<number>();

  const clearTimeout = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId.current);
    }
  };

  const hide = () => {
    notifierHide(id);
    clearTimeout();
  };

  const startTimeout = () => {
    if (timeout) {
      timeoutId.current = window.setTimeout(() => {
        hide();
      }, timeout);
    }

    return () => {
      clearTimeout();
    };
  };

  useEffect(() => {
    if (!isVisible) {
      return () => undefined;
    }

    return startTimeout();
  }, [isVisible]);

  const handlerTransitionExited = () => {
    notifierHide(id, true);
  };

  return (
    <CSSTransition
      in={isVisible}
      timeout={500}
      classNames={{
        enterActive: notifierCss.notifier__itemEnterActive,
        exitActive: notifierCss.notifier__itemExitActive,
      }}
      onExited={handlerTransitionExited}
    >
      <div
        className={classNames(
          notifierCss.notifier__item,
          { [notifierCss.notifier__item_black]: variant === NotifierVariant.black },
        )}
        onMouseLeave={hide}
      >
        {message}
      </div>
    </CSSTransition>
  );
};

Item.defaultProps = defaultProps;

export { Item };
