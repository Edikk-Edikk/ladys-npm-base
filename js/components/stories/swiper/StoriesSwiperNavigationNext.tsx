import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
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
      <FontAwesomeIcon icon={solid('angle-right')} />
    </button>
  );
};

export { StoriesSwiperNavigationNext };
