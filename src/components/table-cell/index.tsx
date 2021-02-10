import * as React from 'react';

import { SelectedSpan } from './styled';

import { useSearchContext } from '../../utils/search-context';
import { prepareMatchArr } from './utils';

interface IProps {
  value: string;
}

export const TableCell = React.memo<IProps>(({ value }) => {
  const [search, _] = useSearchContext();
  const preparedArr = prepareMatchArr(value, search);
  return (
    <td>
      {preparedArr.map((item, index) => (
        <span key={index}>
          {item.toLocaleLowerCase() === search.toLocaleLowerCase() ? (
            <SelectedSpan>{item}</SelectedSpan>
          ) : (
            <span>{item}</span>
          )}
        </span>
      ))}
    </td>
  );
});
