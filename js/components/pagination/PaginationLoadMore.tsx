import * as React from 'react';
import { Button } from 'react-bootstrap';
import { LaddaButton } from '../ladda';
import { PaginationLoadMoreType } from './types';

const PaginationLoadMore: React.FC<PaginationLoadMoreType> = ({
  children,
  page,
  pageSize,
  totalCount,
  isFetching,
  loadMore,
  loadMoreText,
  laddaButtonProps,
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
      <Button variant="secondary" size="lg" className="w-100 mt-3">
        <div className="text-center">
          {renderLoadMoreText()}
        </div>
      </Button>
    );
  };

  return (
    <LaddaButton
      loading={isFetching}
      onClick={handlerClick}
      data-color={laddaButtonProps?.['data-color']}
      data-size={laddaButtonProps?.['data-size']}
      data-style={laddaButtonProps?.['data-style']}
      data-spinner-size={laddaButtonProps?.['data-spinner-size']}
      data-spinner-color={laddaButtonProps?.['data-spinner-color']}
      data-spinner-lines={laddaButtonProps?.['data-spinner-lines']}
    >
      {renderContent()}
    </LaddaButton>
  );
};

export { PaginationLoadMore };
