import React, { VFC } from 'react';
import classNames from 'classnames';
import { Unless } from 'react-if';
import storiesCss from './assets/stories.module.scss';
import storiesCreateLinkCss from './assets/stories-create-link.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

type PropsType = {
  openManagement: () => void;
  hasStories: boolean;
};

const StoriesCreateLink: VFC<PropsType> = ({
  openManagement,
  hasStories,
}) => {
  useStyles(storiesCss, storiesCreateLinkCss);
  return (
    <div className={storiesCreateLinkCss.storyCreateLink}>
      <div className={storiesCss.stories}>
        <div
          role="presentation"
          className={classNames(storiesCss.stories__content, storiesCss.stories__content_borderGreen)}
          onClick={openManagement}
        >
          + Add stories
        </div>
        <div className={storiesCss.stories__footer}>
          <div
            className={classNames(
              storiesCss.stories__label,
              storiesCss.stories__label_bold,
              storiesCss.stories__label_danger,
            )}
          >
            FREE
          </div>
        </div>
      </div>
      <Unless condition={hasStories}>
        <div className={storiesCreateLinkCss.storyCreateLink__label}>
          +55% more clients
        </div>
      </Unless>
    </div>
  );
};

export { StoriesCreateLink };
