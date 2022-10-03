import React from "react";
import MovieClasses from './FavoriteMovies.module.scss';
import { removeFavoriteMovie } from "../../actions/moviesActions";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function FavoriteMoviesComponent({ favoriteMovies }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeMovie = (movie) => {
    dispatch(removeFavoriteMovie(movie));
  }
  const IMAGE_MOVIE_URL = 'https://image.tmdb.org/t/p/w200/';

  return (
    <>
      <div className={MovieClasses.head}>
        <Typography variant="h6" gutterBottom>
          Your favorite movies
        </Typography>
        <IconButton className={MovieClasses.iconButton} size='small' color="primary" onClick={() => { navigate(`/`) }} color="primary" aria-label="upload picture" component="label">
          <ReplyAllIcon style={{ marginRight: '7px' }} />
          Back to gallery
        </IconButton>
      </div>
      <Box className={MovieClasses.moviesList}>
        {favoriteMovies.map((movie, i) => (
          <Card sx={{ maxWidth: 200 }} className={MovieClasses.cardWrap}>
            <CardMedia
              component="img"
              image={`${IMAGE_MOVIE_URL}${movie.poster_path}`}
              alt={movie.original_title}
              onClick={() => navigateToMovieInfo(movie.id)}
            />
            <CardHeader
              title={movie.title}
              subheader="Raiting"
              className={MovieClasses.cardHeader}
            />
            <CardActions disableSpacing className={MovieClasses.cardActions}>
              <FavoriteIcon style={{ color: 'red' }} onClick={() => removeMovie(movie)} />
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  )
}

export default FavoriteMoviesComponent;
