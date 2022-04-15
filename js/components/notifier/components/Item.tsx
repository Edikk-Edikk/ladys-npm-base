import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ItemType } from '../types/ItemType';
import { useNotifier } from '../hooks/useNotifier';
import { Variant } from '../types/Variant';

const defaultProps = {
  timeout: 3000,
  variant: Variant.black,
};

const Item: React.FC<Required<ItemType>> = ({
  id,
  message,
  isVisible,
  timeout,
  variant,
}) => {
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
      classNames="notifier__item"
      onExited={handlerTransitionExited}
    >
      <div
        className={classNames(
          'notifier__item',
          `notifier__item--${variant}`,
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
