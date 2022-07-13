import * as React from 'react';
import { PaginationLoadMoreType } from './types';
import { ButtonLoader } from '../button-loading/ButtonLoader';

const PaginationLoadMore: React.FC<PaginationLoadMoreType> = ({
  children,
  page,
  pageSize,
  totalCount,
  isFetching,
  loadMore,
  loadMoreText,
  className = 'btn btn-primary btn-lg w-100 mt-3',
  loaderColor,
  loaderSize,
}) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  if (page >= totalPageCount) {
    return null;
  }

  const handlerClick = () => {
    const nextPage = page + 1;
    loadMore(nextPage);
  };

  const renderLoadMoreText = () => {
    const countInNextPage = page + 1 === totalPageCount ? totalCount - (page * pageSize) : pageSize;
    if (loadMoreText) {
      return loadMoreText(countInNextPage);
    }

    return `Load more ${countInNextPage} items`;
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    return (
      <ButtonLoader
        tagProps={{
          className: className,
        }}
        disabled={isFetching}
        loading={isFetching}
        loaderSize={loaderSize}
        loaderColor={loaderColor}
        onClick={handlerClick}
      >
        <div className="text-center">
          {renderLoadMoreText()}
        </div>
      </ButtonLoader>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export { PaginationLoadMore };
