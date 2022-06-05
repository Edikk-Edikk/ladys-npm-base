import * as React from 'react';
import Button from 'react-bootstrap/Button';
import { PaginationLoadMoreType } from './types';

const PaginationLoadMore: React.FC<PaginationLoadMoreType> = ({
  children,
  page,
  pageSize,
  totalCount,
  isFetching,
  loadMore,
  loadMoreText,
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
      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-3"
        disabled={isFetching}
        onClick={handlerClick}
      >
        <div className="text-center">
          {renderLoadMoreText()}
        </div>
      </Button>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export { PaginationLoadMore };
