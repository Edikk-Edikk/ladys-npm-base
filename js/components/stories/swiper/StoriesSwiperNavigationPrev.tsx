import classNames from 'classnames';
// @ts-ignore
import AngleLeftSvg from '@fortawesome/fontawesome-free/svgs/solid/angle-left.svg';
import React from 'react';
import { SvgIcon } from '../../svg-icon/SvgIcon';

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
      <SvgIcon icon={AngleLeftSvg} />
    </button>
  );
};

export { StoriesSwiperNavigationPrev };
