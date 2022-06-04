import React, { ReactElement, VFC } from 'react';
import { StoriesType } from '../types';
import { StoriesDetail } from '../detail';
import { ModalFade } from '../../modal-fade';
import { StoriesSwiper } from '../swiper';

type PropsType = {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  index: number | null;
  stories: StoriesType[];
  renderActions?: (id: number) => ReactElement;
};

const StoriesDetailList: VFC<PropsType> = ({
  isVisible,
  show,
  hide,
  index,
  stories,
  renderActions,
}) => {
  const storiesList = stories.map((item) => (
    <StoriesDetail
      id={item.id}
      photoUrl={item.photoUrl}
      description={item.description}
      time={item.time}
      renderActions={renderActions}
    />
  ));

  return (
    <ModalFade isVisible={isVisible} hide={hide} show={show}>
      <StoriesSwiper stories={storiesList} initialSlide={index} />
    </ModalFade>
  );
};

export { StoriesDetailList };
