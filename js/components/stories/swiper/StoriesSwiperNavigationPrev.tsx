import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import React from 'react';

const StoriesSwiperNavigationPrev = ({ swiper }) => {
  const handlerClick = () => {
    swiper.slidePrev();
  };

  return (
    <button
      type="button"
      className={classNames(
        'stories-swiper__navigation',
        'stories-swiper__navigation_prev',
      )}
      onClick={handlerClick}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  );
};

export { StoriesSwiperNavigationPrev };
