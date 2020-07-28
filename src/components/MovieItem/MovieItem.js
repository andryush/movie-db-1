import React from "react";
import "./MovieItem.css";

class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      willWatchBtn: false,
    };
  }

  render() {
    const { movie, deleteMovie, willWatch, willWatchDelete } = this.props;
    return (
      <div key={movie.id} className="card">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt=""
        />
        <p className="title">{movie.title}</p>
        <p className="rating">Rating: {movie.vote_average}</p>

        {this.state.willWatchBtn ? (
          <button 
          className="will-watch-btn-active"
          onClick={() => {
            this.setState({
              willWatchBtn: false
            })
            willWatchDelete(movie)
          }}
          >
            Will watch
          </button>
        ) : (
          <button
            className="will-watch-btn"
            onClick={() => {
              this.setState({
                willWatchBtn: true,
              });

              willWatch(movie);
            }}
          >
            Will watch
          </button>
        )}

        <button className="delete" onClick={() => deleteMovie(movie)}>
          Delete
        </button>
      </div>
    );
  }
}

export default MovieItem;
