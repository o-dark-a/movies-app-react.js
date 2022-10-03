import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchFiltredMovies } from "../thunk/movies";
import { setPaginationPage } from "../actions/moviesActions";
import MoviesListComponent from "../components/MoviesListComponent/MoviesListComponent";
import MoviesPagination from "../components/UI/Pagination/Pagination";
import SideBar from '../components/SideBar/SideBarComponent';
import Grid from '@mui/material/Grid';

function MoviesListPage() {
  const { allMovies, totalPages, currentPage, filterOptions, favoriteMovie } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    const isFilterOption = Object.values(filterOptions).some(option => option !== '');
    if (isFilterOption) {
      dispatch(fetchFiltredMovies(filterOptions, currentPage));
    } else {
      dispatch(fetchMovies(currentPage));
    }
  }, [dispatch, currentPage, filterOptions, favoriteMovie]);

  function changeCurrentPage(_, pageNum) {
    dispatch(setPaginationPage(pageNum));
  }

  return (
    <>
      <SideBar />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MoviesListComponent movies={allMovies} />
          <MoviesPagination count={totalPages} page={currentPage} changeCurrentPage={changeCurrentPage} />
        </Grid>
      </Grid>
    </>
  )
}

export default MoviesListPage;
