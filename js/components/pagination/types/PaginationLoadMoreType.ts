import { PaginationType } from '../../../types';

type PaginationLoadMoreType =
  Pick<PaginationType, 'page' | 'pageCount' | 'pageSize' | 'totalCount'>
  & {
  isFetching: boolean;
  loadMore: (nextPage: number) => void;
  loadMoreText?: (countInNextPage: number) => string;
}

export { PaginationLoadMoreType };
