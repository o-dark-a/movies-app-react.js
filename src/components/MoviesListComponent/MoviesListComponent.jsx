import React from "react";
import MovieComponent from "../MovieComponent/MovieComponent";
import MoviesListClasses from './MoviesList.module.scss';
import Box from '@mui/material/Box';

function MoviesListComponent({ movies }) {
  return (
    <Box className={MoviesListClasses.moviesList}>
      {movies.map((movie, i) => (
        <MovieComponent movie={movie} key={i} />
      ))}
    </Box>
  );
}

export default MoviesListComponent;
