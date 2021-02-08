import * as React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { PaginationBox, StyledA } from './styled';

interface IProps {
  pageSize: number;
  handleChangePage: () => void;
  handleChangePageSize: (size: number) => void;
}

export const Pagination = React.memo<IProps>(
  ({ handleChangePage, handleChangePageSize, pageSize }) => {
    const [isShown, setShown] = useState<boolean>(false);
    const toggle = () => setShown(!isShown);
    const onChangePageSize = (size: number) => {
      toggle();
      handleChangePageSize(size);
    };
    return (
      <PaginationBox>
        <ReactPaginate
          pageCount={50}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handleChangePage}
          containerClassName="pagination"
          activeClassName="active"
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
              <li>
                <StyledA onClick={() => onChangePageSize(20)}>20</StyledA>
              </li>
              <li>
                <StyledA onClick={() => onChangePageSize(50)}>50</StyledA>
              </li>
              <li>
                <StyledA onClick={() => onChangePageSize(100)}>100</StyledA>
              </li>
            </ul>
          </div>
        </PaginationBox>
      </PaginationBox>
    );
  },
);
