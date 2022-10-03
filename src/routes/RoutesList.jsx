import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

const MoviesListPage = lazy(() => import("../pages/MoviesListPage"));
const FavoriteMoviesPage = lazy(() => import("../pages/FavoriteMoviesPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage/SignupPage"));
const MovieInfoPage = lazy(() => import("../pages/MovieInfoPage"));
const NotFound = lazy(() => import("../pages/NotFound"));

function RoutesList() {
  const { userData } = useSelector((state) => state.movies);

  function getComponent(Component) {
    return userData.isLogin ? (
      <>
        <HeaderComponent />
        <Suspense>
          <Component />
        </Suspense>
      </>
    ) : (
      <Navigate to="/login" />
    );
  }

  let element = useRoutes([
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
  ]);

  return element
}

export default RoutesList;