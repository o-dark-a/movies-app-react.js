import React, { useEffect } from "react";
import MovieInfoClasses from './MovieInfo.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../api/moviesAPI";
import { setSelectedMovie } from "../../actions/moviesActions";
import Typography from '@mui/material/Typography';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import CircleIcon from '@mui/icons-material/Circle';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { IMAGE_MOVIE_URL, NO_IMAGE_MOVIE } from '../../config/consts.js';

function MovieInfoComponent() {
  const [open, setOpen] = React.useState(false);
  const { selectedMovie } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    getMovieById(id).then((movie) => dispatch(setSelectedMovie(movie.data)));
  }, [dispatch]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={MovieInfoClasses.movieInfoWrap}>
      <img src={
        selectedMovie.poster_path ?
          `${IMAGE_MOVIE_URL}${selectedMovie.poster_path}` :
          `${NO_IMAGE_MOVIE}`
      }
        alt={selectedMovie.original_title} />
      <div>
        <Typography variant="h4" gutterBottom>
          {selectedMovie.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {selectedMovie.overview}
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              More info
            </ListSubheader>
          }
        >

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary="Tagline" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <Typography variant="body2" gutterBottom>
                  {selectedMovie.tagline}
                </Typography>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary="Genres" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ul>
                {selectedMovie.genres
                  ? selectedMovie.genres.map((genre, i) => (
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <CircleIcon />
                      </ListItemIcon>
                      <ListItemText key={i} primary={`${genre.name}`} />
                    </ListItemButton>

                  ))
                  : null}
              </ul>
            </List>
          </Collapse>
        </List>

      </div>
    </div>
  )
}

export default MovieInfoComponent;