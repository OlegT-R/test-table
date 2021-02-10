import * as React from 'react';

export type SearchContextType = [string, (search: string) => void];

export const SearchContext = React.createContext<SearchContextType>([
  '',
  value => {},
]);

export const useSearchContext = () => {
  const searchContext = React.useContext(SearchContext);
  if (!searchContext) {
    throw new Error(
      'useSearchContext must be used within the SearchContext.Provider',
    );
  }
  return searchContext;
};
