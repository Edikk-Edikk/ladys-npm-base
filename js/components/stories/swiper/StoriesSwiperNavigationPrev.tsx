import classNames from 'classnames';
// @ts-ignore
import AngleLeftSvg from '@fortawesome/fontawesome-free/svgs/solid/angle-left.svg';
import React from 'react';
// @ts-ignore
import storiesSwiperCss from './assets/stories-swiper.module.scss';
import { SvgIcon } from '../../svg-icon/SvgIcon';

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
      <SvgIcon icon={AngleLeftSvg} />
    </button>
  );
};

export { StoriesSwiperNavigationPrev };
