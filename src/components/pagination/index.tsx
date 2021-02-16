import * as React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { PaginationBox, StyledA } from './styled';

import { TABLE_PAGE_SIZES } from '../../utils/constants';

interface IProps {
  pageSize: number;
  handleChangePage: (selectedItem: { selected: number }) => void;
  handleChangePageSize: (size: number) => void;
  totalCount: number;
  currPage: number;
}

export const Pagination = React.memo<IProps>(
  ({
    handleChangePage,
    handleChangePageSize,
    currPage,
    totalCount,
    pageSize,
  }) => {
    const [isShown, setShown] = useState<boolean>(false);
    const toggle = () => setShown(!isShown);
    const onChangePageSize = (size: number) => {
      toggle();
      handleChangePageSize(size);
    };
    return (
      <PaginationBox>
        <ReactPaginate
          pageCount={Math.ceil(totalCount / pageSize)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handleChangePage}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={currPage}
        />
        <PaginationBox>
          Change size:
          <div className={`dropdown ${isShown ? 'open' : ''}`}>
            <button
              className="btn btn-default dropdown-toggle"
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={toggle}
            >
              ({pageSize})
              <span className="caret" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              {TABLE_PAGE_SIZES.map((size: number) => (
                <li key={size}>
                  <StyledA onClick={() => onChangePageSize(size)}>
                    {size}
                  </StyledA>
                </li>
              ))}
            </ul>
          </div>
        </PaginationBox>
      </PaginationBox>
    );
  },
);
