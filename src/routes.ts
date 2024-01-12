export enum ERoute {
  Home = "/",
  Login = "/login",
  Trip = "/trips/:id",
  UserProfile = "/user/:id?/:tab?"
}

const ROUTES = Object.values(ERoute);

const FULL_SCREEN_ROUTES = [ERoute.Trip];

export const getCurrentRoute = () => {
  const pageMatcher = /^\/([a-zA-Z]*)/;
  const match = window.location.pathname.match(pageMatcher);

  if (!match) return null;

  return ROUTES.find((route) => route.toLowerCase().startsWith(match[0]));
};

export const useIsFullScreenRoute = () => {
  const currentRoute = getCurrentRoute();
  return currentRoute ? FULL_SCREEN_ROUTES.includes(currentRoute) : false;
};
