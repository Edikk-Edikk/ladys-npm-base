import classNames from 'classnames';
// @ts-ignore
import AngleRightSvg from '@fortawesome/fontawesome-free/svgs/solid/angle-right.svg';
import React from 'react';
// @ts-ignore
import storiesSwiperCss from './assets/stories-swiper.module.scss';
import { SvgIcon } from '../../svg-icon/SvgIcon';

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
      <SvgIcon icon={AngleRightSvg} />
    </button>
  );
};

export { StoriesSwiperNavigationNext };
