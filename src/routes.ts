import { useMemo } from "react";

export enum ERoute {
  Home = "/",
  Login = "/login",
  Trip = "/trips/:id",
  UserProfile = "/user/:id?/:tab?",
  Error = "/error",
  NotFound = "/404"
}

type TRouteManifest = {
  isFullscreen: boolean;
  requireAuthentication: boolean;
  withMainBar: boolean;
};

const routesManifest: Record<ERoute, TRouteManifest> = {
  [ERoute.Home]: {
    isFullscreen: false,
    requireAuthentication: true,
    withMainBar: true
  },
  [ERoute.Login]: {
    isFullscreen: false,
    requireAuthentication: false,
    withMainBar: false
  },
  [ERoute.Trip]: {
    isFullscreen: true,
    requireAuthentication: true,
    withMainBar: true
  },
  [ERoute.UserProfile]: {
    isFullscreen: false,
    requireAuthentication: true,
    withMainBar: true
  },
  [ERoute.Error]: {
    isFullscreen: false,
    requireAuthentication: false,
    withMainBar: false
  },
  [ERoute.NotFound]: {
    isFullscreen: false,
    requireAuthentication: true,
    withMainBar: true
  }
};

const ROUTES = Object.values(ERoute);

export const getCurrentRoute = (path: string): ERoute | undefined => {
  const pageMatcher = /^\/([a-zA-Z]*)/;
  const match = path.match(pageMatcher);

  if (!match) return undefined;

  return ROUTES.find((route) => route.toLowerCase().startsWith(match[0]));
};

export const useCurrentRoute = () => {
  const pathname = window.location.pathname;

  return useMemo(() => {
    const route = getCurrentRoute(pathname);
    return {
      route,
      manifest: route && routesManifest[route]
    };
  }, [pathname]);
};

export const useIsFullScreenRoute = () => {
  const { manifest } = useCurrentRoute();
  return Boolean(manifest?.isFullscreen);
};
