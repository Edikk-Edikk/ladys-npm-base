import React, { ReactElement, VFC } from 'react';
import HTMLReactParser from 'html-react-parser';
import storyDetailCss from './assets/story-detail.module.scss';
import { StoriesType } from '../types';

type PropsType = Pick<StoriesType, 'id' | 'photo' | 'description' | 'time'> & {
  renderActions: (id: number) => ReactElement;
};

const StoriesDetail: VFC<PropsType> = ({
  id,
  photo,
  description,
  time,
  renderActions,
}) => {
  const renderDescription = () => {
    if (!description) {
      return null;
    }

    return (
      <div className={storyDetailCss.storyDetail__description}>
        {HTMLReactParser(description)}
      </div>
    );
  };

  return (
    <div className={storyDetailCss.storyDetail}>
      <img src={photo} className={storyDetailCss.storyDetail__photo} />
      <div className={storyDetailCss.storyDetail__content}>
        <div className={storyDetailCss.storyDetail__time}>
          <span>
            Posted:
          </span>
          {time}
        </div>
        {renderDescription()}
        <div className={storyDetailCss.storyDetail__actions}>
          {renderActions(id)}
        </div>
      </div>
    </div>
  );
};

export { StoriesDetail };
