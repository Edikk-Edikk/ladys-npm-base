import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
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
      <FontAwesomeIcon icon={solid('angle-left')} />
    </button>
  );
};

export { StoriesSwiperNavigationPrev };
