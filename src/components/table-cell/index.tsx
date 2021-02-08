import * as React from 'react';

import { SelectedSpan } from './styled';

import { useSearchContext } from '../../utils/search-context';

interface IProps {
  value: string;
}

// split input string to word array by search string
// (aabbccddaaammff, aa) -> ['aa', 'bbccdd', 'aa', 'ammff']
const prepareMatchArr = (value: string, search: string): string[] => {
  const matchArr = [];
  let matchStr = '';
  let prevMatchIndex = 0;

  for (let i = 0; i < value.length; i++) {
    const currChar = value[i];
    const matchChar = (search[matchStr.length] || '').toLocaleLowerCase();
    if (currChar.toLocaleLowerCase() === matchChar) {
      matchStr += currChar;
      // if we found matching substr
      if (matchStr.length === search.length) {
        // str before matching str
        const anotherStr = value.slice(prevMatchIndex, i + 1 - search.length);

        anotherStr && matchArr.push(anotherStr);
        matchArr.push(matchStr);

        prevMatchIndex = i + 1;
        matchStr = '';
      }
    } else {
      matchStr = '';
    }
  }

  // append tail after last matching str;
  const tail = value.slice(prevMatchIndex);
  tail && matchArr.push(value.slice(prevMatchIndex));

  return matchArr;
};

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
