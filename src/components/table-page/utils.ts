import { useCallback, useState } from 'react';
import { DEFAULT_TABLE_PAGE_SIZE } from '../../utils/constants';
import {ITableRow, TableDataType} from "../../entities";
import {join, values} from "lodash";

export const useTableHandlerHook = () => {
  const [pageSize, setPageSize] = useState<number>(DEFAULT_TABLE_PAGE_SIZE);
  const [currPage, setCurrPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

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
) => {
  const filteredBySearch = data.filter((item: ITableRow) => {
    const dataValues = values(item);
    const str = join(dataValues, '').toLocaleLowerCase();
    return !search || (search && str.indexOf(search.toLocaleLowerCase()) !== -1);
  });

  const startOffset = page * pageSize;
  const filteredData = filteredBySearch.slice(
    startOffset,
    startOffset + pageSize,
  );

  const totalItemsCount = search ? filteredBySearch.length : data.length;
  return { filteredData, totalItemsCount };
};