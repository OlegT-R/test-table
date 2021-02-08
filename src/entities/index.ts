export enum EStatus {
  SINGLE = 'single',
  COMPLICATED = 'complicated',
  RELATIONSHIP = 'relationship',
}

export enum ESort {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortType = ESort.ASC | ESort.DESC;

export type StatusType =
  | EStatus.COMPLICATED
  | EStatus.SINGLE
  | EStatus.RELATIONSHIP;

export interface ITableRow {
  age: number;
  firstName: string;
  lastName: string;
  progress: number;
  status: StatusType;
  tags: string[];
  visits: number;
}

export type TableRowKeyType = keyof ITableRow;
export type TableDataType = ITableRow[];

export interface IColumn {
  key: TableRowKeyType;
  title: string;
  render?: (value: any) => string;
}
