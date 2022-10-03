import { getMovies, getGenres, getLanguages, getFiltredMovies } from "../api/moviesAPI";
import { loadMoviesSuccess, loadMoviesError, loadGenresSuccess, loadGenresError, loadLanguagesSuccess, loadLanguagesError } from "../actions/moviesActions";

export const fetchMovies = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await getMovies(page);
      dispatch(loadMoviesSuccess(data));
    } catch(err) {
      dispatch(loadMoviesError(err));
    }
  }
}

export const fetchGenres = (language = 'en-US') => {
  return async (dispatch) => {
    try {
      const { data } = await getGenres(language);
      dispatch(loadGenresSuccess(data));
    } catch(err) {
      dispatch(loadGenresError(err));
    }
  }
}

export const fetchLanguages = () => {
  return async (dispatch) => {
    try {
      const { data } = await getLanguages();
      dispatch(loadLanguagesSuccess(data));
    } catch(err) {
      dispatch(loadLanguagesError(err));
    }
  }
}

export const fetchFiltredMovies = (options, page) => {
  return async (dispatch) => {
    try {
      const { data } = await getFiltredMovies(options, page);
      dispatch(loadMoviesSuccess(data));
    } catch(err) {
      dispatch(loadMoviesError(err));
    }
  }
}
