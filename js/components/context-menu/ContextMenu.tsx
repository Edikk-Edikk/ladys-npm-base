import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { usePopper } from 'react-popper';
import { When } from 'react-if';
import useOnclickOutside from 'react-cool-onclickoutside';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import contextMenuCss from './assets/context-menu.module.scss';
import { ContentMenuType, ContextMenuActionType } from './types';

type PropsType = {
  actions: ContextMenuActionType[];
};

const ContextMenu = forwardRef<ContentMenuType, PropsType>(({
  actions,
}, forwardedRef) => {
  const [popoverTarget, setPopoverTarget] = useState<HTMLElement>(null);
  const [popper, setPopper] = useState<HTMLDivElement>(null);
  const [popperArrow, setPopperArrow] = useState<HTMLDivElement>(null);
  const { styles: popoverStyles, attributes: popoverAttributes } = usePopper(popoverTarget, popper, {
    modifiers: [{ name: 'arrow', options: { element: popperArrow } }],
  });

  const show = (target: HTMLElement) => {
    setPopoverTarget(target);
  };

  const hide = () => {
    setPopoverTarget(null);
  };

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
  }), [popoverTarget]);

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
        className={contextMenuCss.contextMenu__action}
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
        className={contextMenuCss.contextMenu}
        ref={refMerged}
        style={popoverStyles.popper}
        {...popoverAttributes.popper}
      >
        <div ref={setPopperArrow} style={popoverStyles.arrow} className={contextMenuCss.contextMenu__arrow} />
        <div className={contextMenuCss.contextMenu__actions}>
          {actionList}
        </div>
      </div>
    </When>
  );
});

export { ContextMenu };
