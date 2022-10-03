import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, alpha } from '@mui/material/styles';
import { setOptions } from "../../actions/moviesActions";
import { NavLink } from "react-router-dom";
import { userLogout } from "../../actions/moviesActions";
import { useNavigate } from "react-router-dom";
import { fetchFiltredMovies } from "../../thunk/movies";
import HeaderClasses from './HeaderComponent.module.scss';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

export default function HeaderComponent() {
  const { favoriteMovie, filterOptions, userData, currentPage } = useSelector((state) => state.movies);
  const [favoriteMovieCount, setfavoriteMovieCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeQuery = (e) => {
    dispatch(setOptions({ query: e.target.value }));
  }

  useEffect(() => {
    dispatch(fetchFiltredMovies(filterOptions, currentPage));
  }, [filterOptions]);

  const logoutHandle = () => {
    dispatch(userLogout());
  }

  useEffect(() => {
    setfavoriteMovieCount(favoriteMovie ? favoriteMovie.length : 0);
  }, [favoriteMovie]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Button size="small">Hello, {userData.userName}</Button>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Button onClick={logoutHandle} size="small">Log out</Button>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink className={HeaderClasses.navLinkCloseMenu} to="favorite">
          <IconButton size="large" aria-label="show 4 favorite movies" color="inherit">
            <Badge badgeContent={favoriteMovieCount} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <p>Favorite movies</p>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu >
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={HeaderClasses.typography}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={() => { navigate(`/`) }}
          >
            YourMovie
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by movie title..."
              inputProps={{ 'aria-label': 'search' }}
              type="text"
              value={filterOptions.query}
              onChange={changeQuery}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLink to="favorite">
              <IconButton size="large" aria-label="show 4 favorite movies" color="inherit">
                <Badge badgeContent={favoriteMovieCount} color="error">
                  <NavLink className={HeaderClasses.navLink} to="favorite">
                    <FavoriteIcon />
                  </NavLink>
                </Badge>
              </IconButton>
            </NavLink>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
