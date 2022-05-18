import React, { VFC } from 'react';
// @ts-ignore
import storiesManagementCss from './stories-management.module.scss';
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
    className={storiesManagementCss.storiesManagementItem}
    onClick={onClick}
  >
    <div className={storiesManagementCss.storiesManagementItem__imageHolder}>
      <img className={storiesManagementCss.storiesManagementItem__image} src={photo} />
    </div>
    <div className={storiesManagementCss.storiesManagementItem__info}>
      <div className={storiesManagementCss.storiesManagementItem__name}>
        {name}
      </div>
      <div className={storiesManagementCss.storiesManagementItem__description}>
        {description}
      </div>
    </div>
  </button>
);

export { Advert };
