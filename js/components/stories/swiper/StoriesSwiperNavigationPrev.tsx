import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
// @ts-ignore
import storiesSwiperCss from './stories-swiper.module.scss';

const StoriesSwiperNavigationPrev = ({ swiper }) => {
  const handlerClick = () => {
    swiper.slidePrev();
  };

  return (
    <button
      type="button"
      className={classNames(
        storiesSwiperCss.storiesSwiper__navigation,
        storiesSwiperCss.storiesSwiper__navigation_prev,
      )}
      onClick={handlerClick}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  );
};

export { StoriesSwiperNavigationPrev };
