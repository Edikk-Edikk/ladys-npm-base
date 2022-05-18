import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Else, If, Then } from 'react-if';
import classNames from 'classnames';
import storiesCss from './assets/stories.module.scss';

type PropsType = {
  id: number;
  photo: string;
  time: string;
  onClick: () => void;
  isProcess?: boolean;
};

const Stories = forwardRef<HTMLDivElement, PropsType>(({
  id,
  photo,
  time,
  onClick,
  isProcess = false,
}, forwardedRef) => {
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
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          </Then>
          <Else>
            <img className={storiesCss.stories__photo} src={photo} />
          </Else>
        </If>
      </div>
      {renderTime()}
    </div>
  );
});

export { Stories };
