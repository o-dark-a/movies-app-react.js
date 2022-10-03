import axios from 'axios';
import { API_KEY, ROOT_API_URL } from '../config';

const moviesAxios = axios.create({
  baseURL: ROOT_API_URL,
  params: {
    api_key: API_KEY,
   }
})

export const getMovies = function (currentPage) {
  return moviesAxios.get(`/3/movie/top_rated?page=${currentPage}`);
};

export const getMovieById = function (movieId) {
  return moviesAxios.get(`/3/movie/${movieId}`);
};

export const getGenres = function () {
  return moviesAxios.get(`/3/genre/movie/list`);
};

export const getLanguages = function () {
  return moviesAxios.get(`/3/configuration/languages`);
};

export const getFiltredMovies = function (options, currentPage = 1) {
  let queryString = '';

  if (options.query && !options.language) {
    queryString = `/3/search/multi?query=${options.query}&page=${currentPage}`;
  } else if (options.with_genres && options.language) {
    queryString = `/3/discover/movie?with_genres=${options.with_genres}&with_original_language=${options.language}&sort_by=original_title.asc&page=${currentPage}`;
  } else if (options.with_genres && !options.language) {
    queryString = `/3/discover/movie?with_genres=${options.with_genres}&sort_by=original_title.asc&page=${currentPage}`;
  } else if (options.query && options.language) {
    queryString = `/3/search/multi?query=${options.query}&language=${options.language}&page=${currentPage}`;
  } else {
    queryString = `/3/discover/movie?with_original_language=${options.language}&sort_by=original_title.asc&page=${currentPage}`;
  }

  return moviesAxios.get(queryString);
};
