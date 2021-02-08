import * as React from 'react';
import { debounce } from 'lodash';

import { useSearchContext } from '../../utils/search-context';

export const Search = React.memo(() => {
  const [_, setSearch] = useSearchContext();
  const debounceSave = debounce(setSearch, 600);
  return (
    <div className="input-group">
      <input
        type="search"
        onChange={e => debounceSave(e.target.value)}
        placeholder="Search"
        className="form-control"
      />
    </div>
  );
});
