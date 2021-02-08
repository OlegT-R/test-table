import * as React from 'react';
import { isUndefined, cond, constant, matches } from 'lodash';

import { StyledTh, ArrowIco } from './styled';

import { IColumn, SortType, ESort } from '../../entities';

interface IProps {
  column: IColumn;
  sort?: SortType;
  onChangeSort: (sort: { [key: string]: SortType }) => void;
}

const getNextSort = cond([
  [isUndefined, constant(ESort.ASC)],
  [matches(ESort.ASC), constant(ESort.DESC)],
  [matches(ESort.DESC), constant(undefined)],
]);

export const HeadColumn = React.memo<IProps>(
  ({ column, onChangeSort, sort }) => {
    const changeSort = () => {
      const nextSort = getNextSort(sort);
      const sortObj = nextSort ? { [column.key]: nextSort } : {};
      onChangeSort(sortObj);
    };

    return (
      <StyledTh onClick={changeSort}>
        <span>{column.title}</span>
        <ArrowIco>
          {sort === ESort.DESC && <>↓</>}
          {sort === ESort.ASC && <>↑</>}
        </ArrowIco>
      </StyledTh>
    );
  },
);
