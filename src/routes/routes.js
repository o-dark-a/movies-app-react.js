import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const MoviesListPage = lazy(() => import("../pages/MoviesListPage"));
const FavoriteMoviesPage = lazy(() => import("../pages/FavoriteMoviesPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage/SignupPage"));
const MovieInfoPage = lazy(() => import("../pages/MovieInfoPage"));
const NotFound = lazy(() => import("../pages/NotFound"));

function getComponent(Component) {
  const TOKEN = localStorage.getItem("AUTH_TOKEN");
  return TOKEN ? (
    <Suspense>
      <Component />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
}

export const routes = [
  {
    path: "/",
    element: getComponent(MoviesListPage),
  },
  {
    path: "favorite",
    element: getComponent(FavoriteMoviesPage),
  },
  {
    path: "movie/:id",
    element: getComponent(MovieInfoPage)
  },
  {
    path: "login",
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  }
];
