import React, { ReactElement, VFC } from 'react';
import HTMLReactParser from 'html-react-parser';
import { StoriesType } from '../types';

type PropsType = Pick<StoriesType, 'id' | 'photoUrl' | 'description' | 'time'> & {
  renderActions: (id: number) => ReactElement;
};

const StoriesDetail: VFC<PropsType> = ({
  id,
  photoUrl,
  description,
  time,
  renderActions,
}) => {
  const renderDescription = () => {
    if (!description) {
      return null;
    }

    return (
      <div className="stories-detail__description">
        {HTMLReactParser(description)}
      </div>
    );
  };

  return (
    <div className="stories-detail">
      <img src={photoUrl} className="stories-detail__photo" />
      <div className="stories-detail__content">
        <div className="stories-detail__time">
          <span>
            Posted:
          </span>
          {time}
        </div>
        {renderDescription()}
        <div className="stories-detail__actions">
          {renderActions(id)}
        </div>
      </div>
    </div>
  );
};

export { StoriesDetail };
