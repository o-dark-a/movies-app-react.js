import React from "react";
import { useSelector } from "react-redux";
import FavoriteMoviesComponent from "../components/FavoriteMoviesComponent/FavoriteMoviesComponent";

function FavoriteMoviesPage() {
  const { favoriteMovies } = useSelector((state) => state.movies);

  return (
    <FavoriteMoviesComponent favoriteMovies={favoriteMovies} />
  )
}

export default FavoriteMoviesPage;