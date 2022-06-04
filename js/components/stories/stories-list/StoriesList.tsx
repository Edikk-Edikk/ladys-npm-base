import React, {
  createRef,
  MutableRefObject,
  ReactElement,
  useEffect,
  useState,
  VFC,
} from 'react';
import chunk from 'lodash/chunk';
import storiesListCss from './asssets/stories-list.module.scss';
import { Stories, StoriesPlaceholder } from '../stories';
import { HorizontalScroller } from '../../horizontal-scroller';
import { StoriesType } from '../types';
import useStyles from 'isomorphic-style-loader/useStyles';

type PropsType = {
  isInit: boolean;
  items: StoriesType[];
  onClickOnStories: (id: number, ref: MutableRefObject<HTMLDivElement>) => void;
  firstElement?: ReactElement;
  rows?: number;
  processedIds?: number[];
};

const StoriesList: VFC<PropsType> = ({
  isInit,
  items,
  onClickOnStories,
  firstElement,
  rows = 1,
  processedIds = [],
}) => {
  useStyles(storiesListCss);
  const [itemsRefList, setItemsRefList] = useState<MutableRefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    setItemsRefList((elRefs) => (
      Array(items.length).fill(null).map((_, i) => elRefs[i] || createRef())
    ));
  }, [items.length]);

  const storiesList = [];
  if (isInit) {
    if (firstElement) {
      storiesList.push(firstElement);
    }
    items.forEach((item, index) => {
      storiesList.push((
        <Stories
          ref={itemsRefList[index]}
          id={item.id}
          photoThumbUrl={item.photoThumbUrl}
          time={item.time}
          onClick={() => {
            onClickOnStories(item.id, itemsRefList[index]);
          }}
          isProcess={processedIds.includes(item.id)}
        />
      ));
    });
  } else {
    storiesList.push(
      <div key={1}><StoriesPlaceholder /></div>,
      <div key={2}><StoriesPlaceholder /></div>,
      <div key={3}><StoriesPlaceholder /></div>,
      <div key={4}><StoriesPlaceholder /></div>,
      <div key={5}><StoriesPlaceholder /></div>,
      <div key={6}><StoriesPlaceholder /></div>,
      <div key={7}><StoriesPlaceholder /></div>,
      <div key={8}><StoriesPlaceholder /></div>,
    );
  }

  const storiesColumnList = chunk(storiesList, rows).map((storiesChunk, storiesChunkIndex) => {
    const stories = storiesChunk.map((storiesChunkItem, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`stories-chunk-item-${index}`}>
        {storiesChunkItem}
      </div>
    ));

    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`stories-chunk-${storiesChunkIndex}`} className={storiesListCss.storiesList__column}>
        {stories}
      </div>
    );
  });

  return (
    <HorizontalScroller innerAdditionalClassName={storiesListCss.storiesList}>
      {storiesColumnList}
    </HorizontalScroller>
  );
};

export { StoriesList };
