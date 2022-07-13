import { PaginationType } from '../../../types';

type PaginationLoadMoreType =
  Pick<PaginationType, 'page' | 'pageCount' | 'pageSize' | 'totalCount'>
  & {
  className?: string;
  isFetching: boolean;
  loadMore: (nextPage: number) => void;
  loadMoreText?: (countInNextPage: number) => string;
  loaderColor?: string;
  loaderSize?: number;
}

export { PaginationLoadMoreType };
