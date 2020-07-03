import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { ListContext } from './Contexts';

function Settings() {
  const displayContext = useContext(ListContext);

  return (
    <>
      <Pagination>
        <Pagination.Prev
          disabled={displayContext.pageIndex === 0}
          onClick={() => {
            displayContext.setPageIndex(displayContext.pageIndex - 1);
          }}
        >
          {'< Prev'}
        </Pagination.Prev>
        <Pagination.Item active>{displayContext.pageIndex + 1}</Pagination.Item>
        <Pagination.Next
          disabled={displayContext.onLastPage}
          onClick={() => {
            displayContext.setPageIndex(displayContext.pageIndex + 1);
          }}
        >
          {'Next >'}
        </Pagination.Next>
      </Pagination>
    </>
  );
}

export default Settings;
