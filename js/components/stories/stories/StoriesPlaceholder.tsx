import Skeleton from 'react-loading-skeleton';
import React from 'react';
import classNames from 'classnames';

const StoriesPlaceholder = () => (
  <div className="stories">
    <div className={classNames('stories__content', 'stories__content_border-none')}>
      <Skeleton circle height={70} width={70} />
    </div>
    <div className={classNames('stories__footer', 'stories__footer_border-none')}>
      <div className="stories__label">
        <Skeleton height={11} width={50} />
      </div>
    </div>
  </div>
);

export { StoriesPlaceholder };
