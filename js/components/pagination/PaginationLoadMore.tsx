import * as React from 'react';
import { PaginationLoadMoreType } from './types';

const PaginationLoadMore: React.FC<PaginationLoadMoreType> = ({
  children,
  page,
  pageSize,
  totalCount,
  isFetching,
  loadMore,
  loadMoreText,
  className = 'btn btn-primary btn-lg w-100 mt-3',
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
      <button
        type="button"
        className={className}
        disabled={isFetching}
        onClick={handlerClick}
      >
        <div className="text-center">
          {renderLoadMoreText()}
        </div>
      </button>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export { PaginationLoadMore };
