import React, { forwardRef } from 'react';
// @ts-ignore
import SpinnerSvg from '@fortawesome/fontawesome-free/svgs/solid/spinner.svg';
import { Else, If, Then } from 'react-if';
import classNames from 'classnames';
import { StoriesType } from '../types';
import { SvgIcon } from '../../svg-icon/SvgIcon';

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
  const renderTime = () => {
    if (!time) {
      return null;
    }

    return (
      <div className="stories__footer">
        <div className="stories__label">
          {time}
        </div>
      </div>
    );
  };

  return (
    <div
      role="presentation"
      className={classNames('stories', { 'stories_is-process': isProcess })}
      onClick={onClick}
      ref={forwardedRef}
      data-id={id}
    >
      <div className="stories__content">
        <If condition={isProcess}>
          <Then>
            <div className="stories__process-indicator">
              <SvgIcon icon={SpinnerSvg} spin />
            </div>
          </Then>
          <Else>
            <img className="stories__photo" src={photoThumbUrl} />
          </Else>
        </If>
      </div>
      {renderTime()}
    </div>
  );
});

export { Stories };
