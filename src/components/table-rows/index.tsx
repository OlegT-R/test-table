import * as React from 'react';
import { toString } from 'lodash';

import { TableCell } from '../table-cell';

import { IColumn, ITableRow, TableDataType } from '../../entities';

interface IProps {
  columns: IColumn[];
  data: TableDataType;
}

export const TableRow = React.memo<IProps>(({ data, columns }) => (
  <>
    {data.map((row: ITableRow) => (
      <tr key={`${row.firstName}${row.lastName}${row.age}`}>
        {columns.map((column: IColumn) => {
          const value = toString(
            column.render ? column.render(row[column.key]) : row[column.key],
          );
          return <TableCell key={column.key} value={value} />;
        })}
      </tr>
    ))}
  </>
));
