import React, { VFC } from 'react';
import { StoriesManagementAdvertType } from '../types';

type PropsType = Pick<StoriesManagementAdvertType, 'photo' | 'name' | 'description'> & {
  onClick: () => void;
};

const Advert: VFC<PropsType> = ({
  photo,
  name,
  description,
  onClick,
}) => (
  <button
    type="button"
    className="stories-management-item"
    onClick={onClick}
  >
    <div className="stories-management-item__image-holder">
      <img className="stories-management-item__image" src={photo} />
    </div>
    <div className="stories-management-item__info">
      <div className="stories-management-item__name">
        {name}
      </div>
      <div className="stories-management-item__description">
        {description}
      </div>
    </div>
  </button>
);

export { Advert };
