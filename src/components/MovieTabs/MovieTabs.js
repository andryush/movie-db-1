import React from "react";
import "./MovieTabs.css";

function MovieTabs(props) {
  const handleClick = (sortValue) => () => props.sort(sortValue);

  const getClassByValue = (value) => {
    return props.sortBy === value ? "btn btn-active" : "btn";
  };

  return (
    <div className="d-flex-btn">
      <div className="btn-inner">
        <button
          className={getClassByValue("popularity.desc")}
          onClick={handleClick("popularity.desc")}
        >
          Popularity
        </button>
      </div>
      <div className="btn-inner">
        <button
          className={getClassByValue("revenue.desc")}
          onClick={handleClick("revenue.desc")}
        >
          Revenue
        </button>
      </div>
      <div className="btn-inner">
        <button
          className={getClassByValue("vote_average.desc")}
          onClick={handleClick("vote_average.desc")}
        >
          Vote avg
        </button>
      </div>
    </div>
  );
}
export default MovieTabs;
