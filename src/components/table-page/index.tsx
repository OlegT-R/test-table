import * as React from 'react';
import { useMemo } from 'react';

import { Table } from '../table';
import { Search } from '../search';
import { Container, SearchBox } from './styled';
import { Pagination } from '../pagination';

import { useTableHandlerHook, filterData } from './utils';
import { SearchContext } from '../../utils/search-context';
import { IColumn, TableDataType } from '../../entities';


interface IProps {
  data: TableDataType;
  columns: IColumn[];
}

export const TablePage = React.memo<IProps>(({ columns, data }) => {
  const {
    search,
    pageSize,
    currPage,
    handleChangeSearch,
    handleChangePage,
    handleChangePageSize,
  } = useTableHandlerHook();

  const { filteredData, totalItemsCount } = useMemo(
    () => filterData(data, search, currPage, pageSize),
    [data, search, currPage, pageSize],
  );
  return (
    <Container>
      <SearchContext.Provider value={[search, handleChangeSearch]}>
        <SearchBox>
          <Search />
        </SearchBox>
        <Table columns={columns} data={filteredData} />
        <Pagination
          handleChangePage={handleChangePage}
          handleChangePageSize={handleChangePageSize}
          pageSize={pageSize}
          totalCount={totalItemsCount}
          currPage={currPage}
        />
      </SearchContext.Provider>
    </Container>
  );
});
