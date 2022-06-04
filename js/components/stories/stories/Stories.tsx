import React, { forwardRef } from 'react';
// @ts-ignore
import SpinnerSvg from '@fortawesome/fontawesome-free/svgs/solid/spinner.svg';
import { Else, If, Then } from 'react-if';
import classNames from 'classnames';
import storiesCss from './assets/stories.module.scss';
import { StoriesType } from '../types';
import { SvgIcon } from '../../svg-icon/SvgIcon';
import useStyles from 'isomorphic-style-loader/useStyles';

type PropsType = Pick<StoriesType, 'id' | 'photoThumbUrl' | 'time'> & {
  onClick: () => void;
  isProcess?: boolean;
};

const Stories = forwardRef<HTMLDivElement, PropsType>(({
  id,
  photoThumbUrl,
  time,
  onClick,
  isProcess = false,
}, forwardedRef) => {
  useStyles(storiesCss);
  const renderTime = () => {
    if (!time) {
      return null;
    }

    return (
      <div className={storiesCss.stories__footer}>
        <div className={storiesCss.stories__label}>
          {time}
        </div>
      </div>
    );
  };

  return (
    <div
      role="presentation"
      className={classNames(storiesCss.stories, { [storiesCss.stories_isProcess]: isProcess })}
      onClick={onClick}
      ref={forwardedRef}
      data-id={id}
    >
      <div className={storiesCss.stories__content}>
        <If condition={isProcess}>
          <Then>
            <div className={storiesCss.stories__processIndicator}>
              <SvgIcon icon={SpinnerSvg} spin />
            </div>
          </Then>
          <Else>
            <img className={storiesCss.stories__photo} src={photoThumbUrl} />
          </Else>
        </If>
      </div>
      {renderTime()}
    </div>
  );
});

export { Stories };
