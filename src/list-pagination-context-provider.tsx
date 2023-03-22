import React from 'react';
import { create } from 'zustand';

type PaginationState = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
};

type PaginationMeta = {
  totalPages: number;
  previousEnabled: boolean;
  nextEnabled: boolean;
};

type Pagination = PaginationState & PaginationMeta;
type PaginationArgs = Pick<PaginationState, 'totalItems' | 'pageSize'>;

const INITIAL_PAGE = 1;

export const usePaginationContext = create<{
  pagination: Pagination;
  setPagination: (pg: Pagination) => any;
  setNextPage: () => void;
  setFirstPage: () => void;
}>((set, get) => ({
  pagination: {
    totalPages: 4,
    pageSize: 0,
    currentPage: INITIAL_PAGE,
    nextEnabled: false,
    previousEnabled: false,
    totalItems: 0,
  },
  setPagination: (args: PaginationArgs) => {
    set((state) => ({ ...state, totalItems: args.totalItems, pageSize: args.pageSize }));
  },
  setNextPage: () => {},
  setPrevPage: () => {},
  setFirstPage: () => {},
}));

export interface ListContextProps {
  total: number;
  perPage: number;
}

type ListPaginationContextProps = ListContextProps;

const ListPaginationContextProvider: FCC<{ value: ListPaginationContextProps }> = ({ children, value }) => {
  const { setPagination } = usePaginationContext();

  React.useEffect(() => {
    setPagination({
      pageSize: value.perPage,
      totalItems: value.total,
    });
  }, [value]);

  return <>{children}</>;
};

export default ListPaginationContextProvider;
