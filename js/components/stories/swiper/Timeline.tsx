import classnames from 'classnames';
import React, { ReactElement, VFC } from 'react';
// @ts-ignore
import storiesTimelineCss from './assets/stories-timeline.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

type PropsType = {
  stories: ReactElement[];
  currentSlide: number;
  progress: number;
  duration: number;
};

const Timeline: VFC<PropsType> = ({
  stories,
  currentSlide,
  progress,
  duration,
}) => {
  useStyles(storiesTimelineCss);
  const items = stories.map((story, index) => {
    const isActive = index === currentSlide;
    const renderIndicator = () => {
      if (!isActive) {
        return null;
      }

      const progressInPercent = (progress / duration) * 100;
      const scaleX = progressInPercent / 100;
      return (
        <div
          className={storiesTimelineCss.storiesTimeline__indicator}
          style={{ transform: `scaleX(${scaleX})` }}
        />
      );
    };

    return (
      <div
        className={classnames(
          storiesTimelineCss.storiesTimeline__item,
          { [storiesTimelineCss.storiesTimeline__item_complete]: index < currentSlide },
        )}
        // eslint-disable-next-line
        key={index}>
        {renderIndicator()}
      </div>
    );
  });

  return (
    <div className={storiesTimelineCss.storiesTimeline}>
      {items}
    </div>
  );
};

export { Timeline };
