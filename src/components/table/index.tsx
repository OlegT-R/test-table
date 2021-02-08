import * as React from 'react';
import { useState } from 'react';
import { orderBy, isEmpty, keys, values } from 'lodash';

import { StyledTable } from './styled';
import { TableRow } from '../table-rows';
import { HeadColumn } from '../head-column';

import { IColumn, TableDataType, SortType } from '../../entities';

interface IProps {
  columns: IColumn[];
  data: TableDataType;
}

export const Table = React.memo<IProps>(({ data, columns }) => {
  const [sort, setSort] = useState<{ [key: string]: SortType }>({});

  const sortedData = isEmpty(sort)
    ? data
    : orderBy(data, keys(sort), values(sort));

  return (
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
          <TableRow data={sortedData} columns={columns} />
        </tbody>
      </StyledTable>
    </div>
  );
});
