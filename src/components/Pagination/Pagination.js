import React from "react";
import "./Pagination.css";

function Pagination(props) {
  return (
    <>
      <div className="total-pages">
        <p className="total-pages-nested">Total pages: {props.totalPages}</p>
      </div>
      <div className="pagination">
        <button type="button" className="btn-prev" disabled={props.currentPage === 1 ? true : false} onClick={props.prevPage}>
          Prev
        </button>
        <p className="current">{props.currentPage}</p>
        <button type="button" className="btn-next" disabled={props.currentPage === 500 ? true : false} onClick={props.nextPage}>
          Next
        </button>
      </div>
    </>
  );
}
export default Pagination;
