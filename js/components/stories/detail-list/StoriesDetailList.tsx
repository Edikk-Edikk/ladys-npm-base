import React, { VFC } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { StoriesType } from '../types';
import { StoryDetail } from '../detail/StoryDetail';
import { ModalFade } from '../../modal-fade';
import { StoriesSwiper } from '../swiper';

type PropsType = {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  index: number | null;
  stories: StoriesType[];
};

const StoriesDetailList: VFC<PropsType> = ({
  isVisible,
  show,
  hide,
  index,
  stories,
}) => {
  const storiesList = stories.map((item) => (
    <StoryDetail
      photo={item.photo}
      description={item.description}
      time={item.time}
      renderActions={(
        <div className="d-flex w-100 gap-3">
          <Button variant="secondary" size="lg" onClick={hide}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-light btn-lg flex-grow-1">
            View profile
          </a>
        </div>
      )}
    />
  ));

  return (
    <ModalFade isVisible={isVisible} hide={hide} show={show}>
      <StoriesSwiper stories={storiesList} initialSlide={index} />
    </ModalFade>
  );
};

export { StoriesDetailList };
