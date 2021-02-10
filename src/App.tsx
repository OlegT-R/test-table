import * as React from 'react';
import { useMemo, useState } from 'react';

import { TablePage } from './components/table-page';

import { createData } from './create-data';
import { IColumn, TableRowKeyType } from './entities';

export default function App() {
  const columns: IColumn[] = useMemo(
    () => [
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
    ],
    [],
  );

  const [data] = useState(() => createData(50));

  return (
    <div>
      <h1>Test (1 lvl)</h1>
      <h3>Description of the task in the README.md</h3>
      <TablePage data={data} columns={columns} />
    </div>
  );
}
