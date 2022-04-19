import { PaginationType } from '../../../types';
import { LaddaButtonPropsType } from '../../ladda';

type PaginationLoadMoreType =
  Pick<PaginationType, 'page' | 'pageCount' | 'pageSize' | 'totalCount'>
  & {
  isFetching: boolean;
  loadMore: (nextPage: number) => void;
  loadMoreText?: (countInNextPage: number) => string;
  laddaButtonProps?: Partial<
    Pick<
      LaddaButtonPropsType,
      'data-color' | 'data-size' | 'data-style' | 'data-spinner-size' | 'data-spinner-color' | 'data-spinner-lines'
    >
  >;
}

export { PaginationLoadMoreType };
