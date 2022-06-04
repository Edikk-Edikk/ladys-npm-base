import Skeleton from 'react-loading-skeleton';
import React from 'react';
import classNames from 'classnames';
import storiesCss from './assets/stories.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const StoriesPlaceholder = () => {
  useStyles(storiesCss);
  return (
    <div className={storiesCss.stories}>
      <div className={classNames(storiesCss.stories__content, storiesCss.stories__content_borderNone)}>
        <Skeleton circle height={70} width={70} />
      </div>
      <div className={classNames(storiesCss.stories__footer, storiesCss.stories__footer_borderNone)}>
        <div className={storiesCss.stories__label}>
          <Skeleton height={11} width={50} />
        </div>
      </div>
    </div>
  );
};

export { StoriesPlaceholder };
