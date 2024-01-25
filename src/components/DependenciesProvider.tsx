import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useCurrentUser from "src/hooks/useCurrentUser";
import { setIsAppReady } from "src/store/global";
import { AppDispatch } from "src/store/store";
import { TRootState } from "src/store/types";
import AppLoading from "src/views/AppLoading/AppLoading";

type TProps = {
  Component: React.FC;
};

export default function DependenciesProvider({ Component }: TProps) {
  /**
   * Renders the main app just after all the dependencies are resolved.
   */

  const { isLoaded: isUserLoaded } = useCurrentUser();

  const dependencies = [isUserLoaded];
  const dispatch: AppDispatch = useDispatch();

  const isAppReady: boolean = useSelector((state: TRootState) => state.global.isAppReady);

  useEffect(() => {
    if (dependencies.every((isLoaded) => isLoaded)) {
      dispatch(setIsAppReady(true));
    }
  }, dependencies);

  return (
    <>
      <AppLoading />
      {isAppReady && <Component />}
    </>
  );
}
