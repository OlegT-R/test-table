import * as React from 'react';
import { useCallback, useState } from 'react';

import { Table } from '../table';
import { Search } from '../search';
import { Container, SearchBox } from './styled';
import { Pagination } from '../pagination';

import { SearchContext } from '../../utils/search-context';
import { createData } from '../../create-data';
import { TableDataType } from '../../entities';
import { IColumn, TableRowKeyType } from '../../entities';

const columns: IColumn[] = [
  { key: 'firstName' as TableRowKeyType, title: 'First name' },
  { key: 'lastName' as TableRowKeyType, title: 'Last name' },
  { key: 'age' as TableRowKeyType, title: 'Age' },
  { key: 'visits' as TableRowKeyType, title: 'Visits' },
  { key: 'status' as TableRowKeyType, title: 'Status' },
  {
    key: 'tags' as TableRowKeyType,
    title: 'Tags',
    render: (value: any) => value.join(', '),
  },
];

const INIT_PAGE_SIZE = 50;

export default function App() {
  const [pageSize, setPageSize] = useState<number>(INIT_PAGE_SIZE);
  const [data, setData] = useState<TableDataType>(() => createData(pageSize));
  const [search, setSearch] = useState<string>('');

  const handleChangePage = useCallback(
    () => {
      setData(createData(pageSize));
    },
    [pageSize],
  );

  const handleChangePageSize = useCallback((size: number) => {
    setPageSize(size);
    setData(createData(size));
  }, []);

  return (
    <Container>
      <h1>Test (1 lvl)</h1>
      <h3>Description of the task in the README.md</h3>
      <SearchContext.Provider value={[search, setSearch]}>
        <SearchBox>
          <Search />
        </SearchBox>
        <Table columns={columns} data={data} />
        <Pagination
          handleChangePage={handleChangePage}
          pageSize={pageSize}
          handleChangePageSize={handleChangePageSize}
        />
      </SearchContext.Provider>
    </Container>
  );
}
