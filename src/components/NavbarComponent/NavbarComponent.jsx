import React from "react";
import { useDispatch } from "react-redux";
import NavbarClasses from './Navbar.module.scss';
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import { userLogout } from "../../actions/moviesActions";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function NavbarComponent({ userData }) {
  const dispatch = useDispatch();

  const logoutHandle = () => {
    dispatch(userLogout());
  }

  if (userData.isLogin) {
    return (
      <nav className={NavbarClasses.mainNav}>
        <NavLink className={NavbarClasses.favoriteLink} to="favorite">
          <Button className={NavbarClasses.favoriteBtn} startIcon={<FavoriteBorderIcon />}>
            Favorite movies
          </Button>
        </NavLink>
        <div className={NavbarClasses.loginBtns}>
          <Button className={NavbarClasses.loginHello} size="small">Hello, {userData.userName}</Button>
          <Button onClick={logoutHandle} size="small">Log out</Button>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className={NavbarClasses.mainNav}>
        <NavLink
          to="favorite"
        > Favorite Movies
        </NavLink>|
        <div className={NavbarClasses.loginBtns}>
          <NavLink
            to="login"
          > Log in
          </NavLink>
          <NavLink
            to="signup"
          > Sign up
          </NavLink>
        </div>
      </nav>
    )
  }
}

export default NavbarComponent;
