import classnames from 'classnames';
import React, { ReactElement, VFC } from 'react';

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
          className="stories-timeline__indicator"
          style={{ transform: `scaleX(${scaleX})` }}
        />
      );
    };

    return (
      <div
        className={classnames(
          'stories-timeline__item',
          { 'stories-timeline__item_complete': index < currentSlide },
        )}
        // eslint-disable-next-line
        key={index}>
        {renderIndicator()}
      </div>
    );
  });

  return (
    <div className="stories-timeline">
      {items}
    </div>
  );
};

export { Timeline };
