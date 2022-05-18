import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
// @ts-ignore
import storiesSwiperCss from './stories-swiper.module.scss';

const StoriesSwiperNavigationNext = ({ swiper }) => {
  const handlerClick = () => {
    swiper.slideNext();
  };

  return (
    <button
      type="button"
      className={classNames(
        storiesSwiperCss.storiesSwiper__navigation,
        storiesSwiperCss.storiesSwiper__navigation_next,
      )}
      onClick={handlerClick}
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  );
};

export { StoriesSwiperNavigationNext };
