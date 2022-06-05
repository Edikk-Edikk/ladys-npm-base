import React, { VFC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Advert } from './Advert';
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
        <div key={i} className="stories-management-item">
          <div className="stories-management-item__image-holder">
            <div className="stories-management-item__image">
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
    <div className="stories-management">
      {advertList}
    </div>
  );
};

export { Adverts };
