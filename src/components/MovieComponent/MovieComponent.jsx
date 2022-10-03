import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MovieClasses from './Movie.module.scss';
import { addFavoriteMovie, removeFavoriteMovie } from "../../actions/moviesActions";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { IMAGE_MOVIE_URL, NO_IMAGE_MOVIE } from '../../config/consts.js';

function MovieComponent({ movie }) {
  const { favoriteMovies } = useSelector((state) => state.movies);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function navigateToMovieInfo(movieId) {
    navigate(`/movie/${movieId}`);
  }

  const favoriteMovieHandler = (_favoriteMovie) => {
    if (!favoriteMovies.some(movie => movie.id === _favoriteMovie.id)) {
      dispatch(addFavoriteMovie(_favoriteMovie));
    } else {
      dispatch(removeFavoriteMovie(_favoriteMovie))
    }
  }

  return (
    <Card sx={{ maxWidth: 200 }} className={MovieClasses.cardWrap}>
      <CardMedia
        component="img"
        image={ movie.poster_path ?
                `${IMAGE_MOVIE_URL}${movie.poster_path}` : 
                `${NO_IMAGE_MOVIE}`
              }
        alt={movie.original_title}
        onClick={() => navigateToMovieInfo(movie.id)}
      />
      <CardHeader
        title={movie.title}
        subheader="Raiting"
        className={MovieClasses.cardHeader}
      />
      <CardActions disableSpacing className={MovieClasses.cardActions}>
        {
          (movie.isLiked) ?
            <FavoriteIcon onClick={() => { favoriteMovieHandler(movie) }} className={MovieClasses.heartIcon} />
            : <FavoriteBorderIcon onClick={() => { favoriteMovieHandler(movie) }} className={MovieClasses.heartIcon} />
        }
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default MovieComponent;
