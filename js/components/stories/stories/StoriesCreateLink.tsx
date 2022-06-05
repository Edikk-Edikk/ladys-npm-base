import React, { VFC } from 'react';
import classNames from 'classnames';
import { Unless } from 'react-if';

type PropsType = {
  openManagement: () => void;
  hasStories: boolean;
};

const StoriesCreateLink: VFC<PropsType> = ({
  openManagement,
  hasStories,
}) => (
  <div className="stories-create-link">
    <div className="stories">
      <div
        role="presentation"
        className={classNames('stories__content', 'stories__content_border-green')}
        onClick={openManagement}
      >
        + Add stories
      </div>
      <div className="stories__footer">
        <div
          className={classNames(
            'stories__label',
            'stories__label_bold',
            'stories__label_danger',
          )}
        >
          FREE
        </div>
      </div>
    </div>
    <Unless condition={hasStories}>
      <div className="stories-create-link__label">
        +55% more clients
      </div>
    </Unless>
  </div>
);

export { StoriesCreateLink };
