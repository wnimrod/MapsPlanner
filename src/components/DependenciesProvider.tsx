import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useColorScheme from "src/hooks/useColorScheme";
import useCurrentUser from "src/hooks/useCurrentUser";
import { ERoute } from "src/routes";
import { setIsAppReady } from "src/store/global";
import { AppDispatch } from "src/store/store";
import { TRootState } from "src/store/types";
import AppLoading from "src/views/AppLoading/AppLoading";

type TProps = {
  Component: React.FC;
};

type TDependencyState = {
  isLoaded?: boolean;
  error?: string;
};

enum EAppState {
  Loading,
  Ready,
  Error
}

export default function DependenciesProvider({ Component }: TProps) {
  /**
   * Renders the main app just after all the dependencies are resolved.
   */

  const { systemColorScheme, setColorScheme } = useColorScheme();

  const [appState, setAppState] = useState(EAppState.Loading);

  const isAppReady: boolean = useSelector((state: TRootState) => state.global.isAppReady);

  const dispatch: AppDispatch = useDispatch();
  const currentUser = useCurrentUser();
  const dependencies: TDependencyState[] = [currentUser];

  const navigate = useNavigate();

  const dependenciesErrors = useMemo(
    () => dependencies.filter(({ error }) => error !== undefined).map(({ error }) => String(error)),
    [dependencies]
  );

  useEffect(() => {
    setColorScheme(systemColorScheme);
  }, []);

  useEffect(() => {
    if (appState !== EAppState.Loading) {
      return;
    }

    const areAllDependenciesLoaded = dependencies.every(({ isLoaded }) => isLoaded);
    if (areAllDependenciesLoaded) {
      setAppState(EAppState.Ready);
      dispatch(setIsAppReady(true));
    } else if (dependenciesErrors.length > 0) {
      dispatch(setIsAppReady(true));
      setAppState(EAppState.Error);
      // Navigate to error page
      navigate(ERoute.Error, { replace: true, state: { errors: dependenciesErrors } });
    }
  }, [isAppReady, dependenciesErrors.length, ...dependencies]);

  return (
    <>
      <AppLoading key={String(isAppReady)} />
      {appState !== EAppState.Loading && <Component />}
    </>
  );
}
