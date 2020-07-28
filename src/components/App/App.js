import React from "react";
import "./App.css";

import MovieTabs from "../MovieTabs/MovieTabs";
import Pagination from '../Pagination/Pagination';

import { API_KEY_3, API_URL, CORS_PROXY } from "../../utils/apiData";

//import moviesData from "../../data/moviesData";

import MoviesItem from "../MovieItem/MovieItem";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      willWatch: [],
      sortBy: "popularity.desc",
      currentPage: null,
      totalPages: null
    };

    console.log("constructor");
  }

  deleteMovie = (movie) => {
    let updatedMovies = this.state.movies.filter((el) => {
      return el.id !== movie.id;
    });

    let updatedWillWatch = this.deleteFromWillWatch(movie);

    this.setState({
      movies: updatedMovies,
      willWatch: updatedWillWatch,
    });
  };

  deleteFromWillWatch = (movie) => {
    let updatedWillWatch = this.state.willWatch.filter((el) => {
      return el.id !== movie.id;
    })
    return updatedWillWatch;
  }

  delFromWillWatch = (movie) => {
    let updatedWillWatch = this.state.willWatch.filter((el) => {
      return el.id !== movie.id;
    })

    this.setState({
      willWatch: updatedWillWatch
    })
  }

  willWatchHandler = (movie) => {
    const newState = [...this.state.willWatch, movie];

    this.setState({
      willWatch: newState,
    });
  };

  willWatchDeleteHandler = (movie) => {
    let updatedWillWatch = this.state.willWatch.filter(
      (el) => el.id !== movie.id
    );

    this.setState({
      willWatch: updatedWillWatch,
    });
  };

  sortByHandler = (sortType) => {
    this.setState({
      sortBy: sortType,
      currentPage: 1
    })
  }

  getMovies = () => {
    fetch(
      `${CORS_PROXY}${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sortBy}&page=${this.state.currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("fetching");
        this.setState({
          movies: data.results,
          currentPage: data.page,
          totalPages: data.total_pages
        });
      });
  }

  nextPageHandler = () => {
    if(this.state.currentPage !== 500) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    } else {
      return;
    }
  }

  prevPageHandler = () => {
    if(this.state.currentPage !== 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      })
    } else {
      return;
    }
  }

  componentDidMount() {
    console.log("did mount");
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.sortBy !== this.state.sortBy) {
      this.getMovies();
    }
    if(prevState.currentPage !== this.state.currentPage) {
      this.getMovies();
    }
  }

  justForTest = (param) => {
    console.log(param.id);
    console.log('clicked');
  }

  render() {
    console.log("render");
    return (
      <div className="container">
        <div className="tabs">
          <div className="tabs-inner">
            <MovieTabs 
              sortBy={this.state.sortBy}
              sort={this.sortByHandler} />
          </div>
        </div>
        <div className="pagination-container">
          <Pagination 
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            nextPage={this.nextPageHandler}
            prevPage={this.prevPageHandler}
          />
        </div>
        <div className="d-flex">
          <div className="grid">
            {this.state.movies.map((movie) => {
              return (
                <MoviesItem
                  key={movie.id}
                  movie={movie}
                  deleteMovie={this.deleteMovie}
                  willWatch={this.willWatchHandler}
                  willWatchDelete={this.willWatchDeleteHandler}
                />
              );
            })}
          </div>
          <div className="will-watch">
            <div className="will-watch-nested">
              <p>Will watch: {this.state.willWatch.length}</p>
              {this.state.willWatch.map((el) => {
                return(
                  <div key={el.id}>
                      <p onClick={() => this.delFromWillWatch(el)}>{el.title}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Pagination  
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            nextPage={this.nextPageHandler}
            prevPage={this.prevPageHandler}
          />
      </div>
    );
  }
}
export default App;
