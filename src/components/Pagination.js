import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationA = ({ pageNum, setPageNum, totalPageNum }) => {
  const handleClick = (page) => {
    setPageNum(parseInt(page));
  };

  const handleClickOnFirst = () => {
    setPageNum(1);
  };

  const handleClickOnLast = () => {
    setPageNum(totalPageNum);
  };
  const handleClickOnNext = () => {
    if (pageNum < totalPageNum) {
      setPageNum((num) => num + 1);
    }
  };
  const handleClickOnPrev = () => {
    if (pageNum > 1) {
      setPageNum((num) => num - 1);
    }
  };

  return (
    <Pagination className="justify-content-center">
      {/* from page 1 to page 3*/}
      <Pagination.First disabled={pageNum === 1} onClick={handleClickOnFirst} />
      <Pagination.Prev disabled={pageNum === 1} onClick={handleClickOnPrev} />
      <Pagination.Item active={pageNum === 1} onClick={() => handleClick(1)}>
        {1}
      </Pagination.Item>{" "}
      <Pagination.Item disabled={pageNum === 2} onClick={() => handleClick(2)}>
        {2}
      </Pagination.Item>
      <Pagination.Item disabled={pageNum === 3} onClick={() => handleClick(3)}>
        {3}
      </Pagination.Item>
      {/* show the page ellipsis */}
      {pageNum - 1 > 1 && <Pagination.Ellipsis />}
      {/* {pageNum > 1 && pageNum < totalPageNum && (
        <Pagination.Item active>{pageNum}</Pagination.Item>
      )} */}
      {totalPageNum > pageNum + 1 && <Pagination.Ellipsis />}
      {/* show middle page */}
      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === Math.floor((totalPageNum - 2) / 2)}
          onClick={() => handleClick(Math.floor((totalPageNum - 2) / 2))}
        >
          {Math.floor((totalPageNum - 2) / 2)}
        </Pagination.Item>
      )}
      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === (totalPageNum - 1) / 2}
          onClick={() => handleClick((totalPageNum - 1) / 2)}
        >
          {(totalPageNum - 1) / 2}
        </Pagination.Item>
      )}
      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === (totalPageNum + 1) / 2}
          onClick={() => handleClick((totalPageNum + 1) / 2)}
        >
          {(totalPageNum + 1) / 2}
        </Pagination.Item>
      )}
      {totalPageNum > pageNum + 1 && <Pagination.Ellipsis />}
      {/* show total page and 2 previos*/}
      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === totalPageNum - 2}
          onClick={() => handleClick(totalPageNum - 2)}
        >
          {totalPageNum - 2}
        </Pagination.Item>
      )}
      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === totalPageNum - 1}
          onClick={() => handleClick(totalPageNum - 1)}
        >
          {totalPageNum - 1}
        </Pagination.Item>
      )}
      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === totalPageNum}
          onClick={() => handleClick(totalPageNum)}
        >
          {totalPageNum}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={pageNum === totalPageNum}
        onClick={handleClickOnNext}
      />
      <Pagination.Last
        disabled={pageNum === totalPageNum}
        onClick={handleClickOnLast}
      />
    </Pagination>
  );
};

export default PaginationA;
