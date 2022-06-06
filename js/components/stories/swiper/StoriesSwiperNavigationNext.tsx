import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import React from 'react';

const StoriesSwiperNavigationNext = ({ swiper }) => {
  const handlerClick = () => {
    swiper.slideNext();
  };

  return (
    <button
      type="button"
      className={classNames(
        'stories-swiper__navigation',
        'stories-swiper__navigation_next',
      )}
      onClick={handlerClick}
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  );
};

export { StoriesSwiperNavigationNext };
