import React, { forwardRef } from 'react';
import { Else, If, Then } from 'react-if';
import classNames from 'classnames';
import { StoriesType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

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
              <FontAwesomeIcon icon={faSpinner} spin />
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
