import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { usePopper } from 'react-popper';
import { When } from 'react-if';
import useOnclickOutside from 'react-cool-onclickoutside';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import { ContentMenuType, ContextMenuActionType } from './types';

type PropsType = {
  actions: ContextMenuActionType[];
  onShow?: (target: HTMLElement) => void;
  onHide?: () => void;
};

const ContextMenu = forwardRef<ContentMenuType, PropsType>(({
  actions,
  onShow,
  onHide,
}, forwardedRef) => {
  const [popoverTarget, setPopoverTarget] = useState<HTMLElement>(null);
  const [popper, setPopper] = useState<HTMLDivElement>(null);
  const [popperArrow, setPopperArrow] = useState<HTMLDivElement>(null);
  const { styles: popoverStyles, attributes: popoverAttributes } = usePopper(popoverTarget, popper, {
    modifiers: [{ name: 'arrow', options: { element: popperArrow } }],
  });

  const show = useCallback((target: HTMLElement) => {
    setPopoverTarget(target);
    if (onShow) {
      onShow(target);
    }
  }, [onShow]);

  const hide = useCallback(() => {
    setPopoverTarget(null);
    if (onHide) {
      onHide();
    }
  }, [onHide]);

  const isOpen = () => !!popoverTarget;

  const refOnclickOutside = useOnclickOutside(() => {
    hide();
  }, {
    ignoreClass: ['story'],
  });
  const refMerged = useMergedRefs<HTMLDivElement>(setPopper, refOnclickOutside);

  useImperativeHandle(forwardedRef, () => ({
    show,
    hide,
    isOpen,
  }), [popoverTarget, show, hide]);

  const handlerClickOnAction = (onClick: () => void) => {
    hide();
    onClick();
  };

  const actionList = actions.map(({
    title,
    onClick,
    styles,
  }) => {
    const handlerClick = () => {
      handlerClickOnAction(onClick);
    };

    return (
      <button
        type="button"
        key={title}
        className="context-menu__action"
        onClick={handlerClick}
        style={styles}
      >
        {title}
      </button>
    );
  });

  return (
    <When condition={isOpen()}>
      <div
        className="context-menu"
        ref={refMerged}
        style={popoverStyles.popper}
        {...popoverAttributes.popper}
      >
        <div ref={setPopperArrow} style={popoverStyles.arrow} className="context-menu__arrow" />
        <div className="context-menu__actions">
          {actionList}
        </div>
      </div>
    </When>
  );
});

export { ContextMenu };
