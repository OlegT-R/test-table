import * as React from 'react';

import { StyledTable } from './styled';
import { TableRow } from '../table-rows';
import { HeadColumn } from '../head-column';

import { IColumn, TableDataType, SortType } from '../../entities';

interface IProps {
  columns: IColumn[];
  data: TableDataType;
  sort: Record<string, SortType>;
  setSort: (param: Record<string, SortType>) => void;
}

export const Table = React.memo<IProps>(({ sort, setSort, data, columns }) => (
  <div>
    <StyledTable>
      <thead>
        <tr>
          {columns.map((column: IColumn) => (
            <HeadColumn
              column={column}
              key={column.key}
              sort={sort[column.key]}
              onChangeSort={setSort}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        <TableRow data={data} columns={columns} />
      </tbody>
    </StyledTable>
  </div>
));
