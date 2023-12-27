export enum ERoute {
  Home = "/",
  Login = "/login",
  Trip = "/trips/:id"
}

const FULL_SCREEN_ROUTES = [ERoute.Trip];

export const useIsFullScreenRoute = () => {
  // TODO: Is there anyway to do it with react router??
  const paramsRegex = /:[^/]+/;
  return FULL_SCREEN_ROUTES.map((route: string) => route.replace(paramsRegex, ".*")).some(
    (rePattern) => window.location.pathname.match(rePattern)
  );
};
