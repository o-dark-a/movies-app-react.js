import {
  LOAD_MOVIES_SUCCESS, SET_SELECTED_MOVIE,
  LOAD_GENRES_SUCCESS, LOAD_LANGUAGES_SUCCESS,
  SET_PAGINATION_PAGE, SET_FILTER_OPTION,
  ADD_FAVORITE_MOVIE, REMOVE_FAVORITE_MOVIE,
  SET_USER_DATA, USER_LOGIN, USER_LOGOUT
} from "../actions/moviesActions";

export const initialState = {
  allMovies: [],
  selectedMovie: {},
  totalPages: 0,
  allGenres: [],
  allLanguages: [],
  currentPage: 1,
  filterOptions: {
    query: '',
    language: '',
    with_genres: ''
  },
  favoriteMovies: [],
  userData: {
    isLogin: false
  }
}

export function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MOVIES_SUCCESS:
      return {
        ...state,
        allMovies: action.payload.movies.results.map(
          movie => state.favoriteMovies.length && state.favoriteMovies.some(favoriteMovie => favoriteMovie.id === movie.id)
          ? { ...movie, isLiked: true}
          : { ...movie, isLiked: false } ),
        totalPages: action.payload.movies.total_pages <= 500 ? action.payload.movies.total_pages : 500
      }
    case SET_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload.selectedMovie
      }
    case LOAD_GENRES_SUCCESS:
      return {
        ...state,
        allGenres: action.payload.genres
      }
    case LOAD_LANGUAGES_SUCCESS:
      return {
        ...state,
        allLanguages: action.payload.languages
      }
    case SET_PAGINATION_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage
      }
    case ADD_FAVORITE_MOVIE:
      return {
        ...state,
        allMovies: state.allMovies.map(movie => movie.id !== action.payload.favoriteMovie.id ? movie : {
          ...movie,
          isLiked: !movie.isLiked
        }),
        favoriteMovies: [
          ...state.favoriteMovies,
          {
            ...action.payload.favoriteMovie,
            isLiked: true
          }
        ]
      }
    case REMOVE_FAVORITE_MOVIE:
      return {
        ...state,
        allMovies: state.allMovies.map(movie => movie.id !== action.payload.favoriteMovie.id ? movie : {
          ...movie,
          isLiked: !movie.isLiked
        }),
        favoriteMovies: state.favoriteMovies.filter(movie => movie.id !== action.payload.favoriteMovie.id)
      }
    case SET_FILTER_OPTION:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          ...action.payload.option
        }
      }
    case SET_USER_DATA:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload.userData
        }
      }
    case USER_LOGIN:
      return {
        ...state,
        userData: {
          ...state.userData,
          isLogin: true
        }
      }
    case USER_LOGOUT:
      return {
        ...state,
        userData: {
          ...state.userData,
          isLogin: false
        }
      }
    default:
      return state;
  }
}
