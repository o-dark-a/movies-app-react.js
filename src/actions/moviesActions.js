export const LOAD_MOVIES_SUCCESS = '[MOVIES] Load movies success';
export const LOAD_MOVIES_ERROR = '[MOVIES] Load movies error';
export const LOAD_GENRES_SUCCESS = '[MOVIES] Load genres success';
export const LOAD_GENRES_ERROR = '[MOVIES] Load genres error';
export const LOAD_LANGUAGES_SUCCESS = '[MOVIES] Load languages success';
export const LOAD_LANGUAGES_ERROR = '[MOVIES] Load languages error';
export const SET_SELECTED_MOVIE = '[MOVIES] Get movie info';
export const SET_PAGINATION_PAGE = '[MOVIES] Set pagination page';
export const SET_FILTER_OPTION = '[MOVIES] Set filter option';
export const ADD_FAVORITE_MOVIE = '[MOVIES] Add favorite movie';
export const REMOVE_FAVORITE_MOVIE = '[MOVIES] Remove favorite movie';
export const SET_USER_DATA = '[MOVIES] Set user data';
export const USER_LOGIN = '[MOVIES] User log in';
export const USER_LOGOUT = '[MOVIES] User log out';

export const loadMoviesSuccess = (movies) => ({
  type: LOAD_MOVIES_SUCCESS,
  payload: { movies }
})

export const loadMoviesError = (error) => ({
  type: LOAD_MOVIES_ERROR,
  payload: { error }
})

export const loadGenresSuccess = ({genres}) => ({
  type: LOAD_GENRES_SUCCESS,
  payload: { genres }
})

export const loadGenresError = (error) => ({
  type: LOAD_GENRES_ERROR,
  payload: { error }
})

export const loadLanguagesSuccess = (languages) => ({
  type: LOAD_LANGUAGES_SUCCESS,
  payload: { languages }
})

export const loadLanguagesError = (error) => ({
  type: LOAD_LANGUAGES_ERROR,
  payload: { error }
})

export const setSelectedMovie = (selectedMovie) => ({
  type: SET_SELECTED_MOVIE,
  payload: { selectedMovie }
})

export const setPaginationPage = (currentPage) => ({
  type: SET_PAGINATION_PAGE,
  payload: { currentPage }
})

export const setOptions = (option) => ({
  type: SET_FILTER_OPTION,
  payload: { option }
})

export const addFavoriteMovie = (favoriteMovie) => ({
  type: ADD_FAVORITE_MOVIE,
  payload: { favoriteMovie }
})

export const removeFavoriteMovie = (favoriteMovie) => ({
  type: REMOVE_FAVORITE_MOVIE,
  payload: { favoriteMovie }
})

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: { userData }
})

export const userLogin = () => ({
  type: USER_LOGIN
})

export const userLogout = () => ({
  type: USER_LOGOUT
})
