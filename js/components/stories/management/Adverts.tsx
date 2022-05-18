import React, { VFC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Advert } from './Advert';
// @ts-ignore
import storiesManagementCss from './stories-management.module.scss';
import { StoriesManagementAdvertType } from '../types';

type PropsType = {
  adverts: StoriesManagementAdvertType[];
  onClickOnAdvert: (id: number) => void;
};

const Adverts: VFC<PropsType> = ({
  adverts,
  onClickOnAdvert,
}) => {
  let advertList = [];
  if (!adverts) {
    for (let i = 0; i < 16; i += 1) {
      advertList.push((
        <div key={i} className={storiesManagementCss.storiesManagementItem}>
          <div className={storiesManagementCss.storiesManagementItem__imageHolder}>
            <div className={storiesManagementCss.storiesManagementItem__image}>
              <Skeleton height="100%" />
            </div>
          </div>
        </div>
      ));
    }
  } else {
    advertList = adverts.map((advert) => {
      const handlerClick = (): void => {
        onClickOnAdvert(advert.id);
      };

      return (
        <Advert
          key={advert.id}
          photo={advert.photo}
          name={advert.name}
          description={advert.description}
          onClick={handlerClick}
        />
      );
    });
  }

  return (
    <div className={storiesManagementCss.storiesManagement}>
      {advertList}
    </div>
  );
};

export { Adverts };
