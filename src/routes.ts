export enum ERoute {
  Home = "/",
  Login = "/login",
  Trip = "/trips/:id",
  UserProfile = "/settings/profile/:id?/:page?"
}

const FULL_SCREEN_ROUTES = [ERoute.Trip];

export const getCurrentRoute = () => {
  const paramsRegex = /:[^/]+/g;
  const patternPairs = Object.values(ERoute).map((route: string) => ({
    route,
    pattern: route.replace(paramsRegex, ".*")
  }));

  const match = patternPairs.find(({ pattern }) => window.location.pathname.match(`^${pattern}$`));

  return match?.route;
};

export const useIsFullScreenRoute = () => {
  // TODO: Is there anyway to do it with react router??
  const paramsRegex = /:[^/]+/g;
  return FULL_SCREEN_ROUTES.map((route: string) => route.replace(paramsRegex, ".*")).some(
    (rePattern) => window.location.pathname.match(rePattern)
  );
};
