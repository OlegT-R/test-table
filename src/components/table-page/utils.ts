import { useCallback, useState } from 'react';
import { join, values, isEmpty, orderBy, keys } from 'lodash';

import { DEFAULT_TABLE_PAGE_SIZE } from '../../utils/constants';
import { ITableRow, SortType, TableDataType } from '../../entities';

export const useTableHandlerHook = () => {
  const [pageSize, setPageSize] = useState<number>(DEFAULT_TABLE_PAGE_SIZE);
  const [currPage, setCurrPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<Record<string, SortType>>({});

  const handleChangeSort = useCallback((sort: Record<string, SortType>) => {
    setCurrPage(0);
    setSort(sort);
  }, []);

  const handleChangeSearch = useCallback((search: string) => {
    setCurrPage(0);
    setSearch(search);
  }, []);

  const handleChangePage = useCallback(({ selected }: { selected: number }) => {
    setCurrPage(selected);
  }, []);

  const handleChangePageSize = useCallback((size: number) => {
    setCurrPage(0);
    setPageSize(size);
  }, []);

  return {
    pageSize,
    currPage,
    search,
    sort,
    handleChangeSort,
    handleChangeSearch,
    handleChangePage,
    handleChangePageSize,
  };
};

export const filterData = (
  data: TableDataType,
  search: string,
  page: number,
  pageSize: number,
  sort: Record<string, SortType>,
) => {

  const withSortingData = isEmpty(sort)
    ? data
    : orderBy(data, keys(sort), values(sort));

  const filteredBySearch = withSortingData.filter((item: ITableRow) => {
    const dataValues = values(item);
    const str = join(dataValues, '').toLocaleLowerCase();
    return (
      !search || (search && str.indexOf(search.toLocaleLowerCase()) !== -1)
    );
  });

  const startOffset = page * pageSize;

  const onlyCurrentPageData = filteredBySearch.slice(
    startOffset,
    startOffset + pageSize,
  );

  const totalItemsCount = search ? filteredBySearch.length : data.length;

  return { preparedData: onlyCurrentPageData, totalItemsCount };
};
