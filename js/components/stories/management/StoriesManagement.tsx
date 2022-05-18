import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StoriesManagementType, StoriesManagementAdvertType } from '../types';
import { Adverts } from './Adverts';
import { BottomSheet } from '../../bottom-sheet';

type PropsType = {
  adverts: StoriesManagementAdvertType[];
  onClickOnAdvert: (advertId: number) => void;
  onHideEnd: () => void;
};

const StoriesManagement = forwardRef<StoriesManagementType, PropsType>(({
  adverts,
  onClickOnAdvert,
  onHideEnd,
}, forwardedRef) => {
  const [isVisible, setIsVisible] = useState<boolean>(null);

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  useImperativeHandle<StoriesManagementType, StoriesManagementType>(forwardedRef, () => ({
    show,
    hide,
  }), []);

  const handlerClickOnAdvert = (advertId: number): void => {
    onClickOnAdvert(advertId);
  };

  return (
    <BottomSheet isVisible={isVisible} show={show} hide={hide} onHideEnd={onHideEnd}>
      <Adverts adverts={adverts} onClickOnAdvert={handlerClickOnAdvert} />
    </BottomSheet>
  );
});

export { StoriesManagement };
