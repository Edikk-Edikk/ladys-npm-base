import classNames from 'classnames';
// @ts-ignore
import AngleRightSvg from '@fortawesome/fontawesome-free/svgs/solid/angle-right.svg';
import React from 'react';
import { SvgIcon } from '../../svg-icon/SvgIcon';

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
      <SvgIcon icon={AngleRightSvg} />
    </button>
  );
};

export { StoriesSwiperNavigationNext };
