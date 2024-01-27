import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Box, Container } from "@mui/material";

import axios from "axios";
import { SWRConfig } from "swr";

import { ERoute, useCurrentRoute, useIsFullScreenRoute } from "src/routes.ts";

import style from "./App.module.scss";
import MainBar from "./components/MainBar/MainBar";
import useCurrentUser from "./hooks/useCurrentUser";
import { setAdministratorMode } from "./store/global";
import { AppDispatch } from "./store/store";
import { TRootState } from "./store/types";
import ActionConfirmDialog, {
  TActionConfirmDialogRef
} from "./ui/molecules/ActionConfirmDialog/ActionConfirmDialog";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import HomeScreen from "./views/HomeScreen/HomeScreen";
import LoginPage from "./views/LoginPage/LoginPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import ResourceNotFoundPage from "./views/ResourceNotFoundPage/ResourceNotFoundPage";
import TripScreen from "./views/TripScreen/TripScreen";

function App() {
  const isAppReady: boolean = useSelector((state: TRootState) => state.global.isAppReady);
  const isFullScreenPage = useIsFullScreenRoute();

  const { user } = useCurrentUser();
  const { manifest: routeManifest } = useCurrentRoute();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const confirmDialogDialogRef = useRef<TActionConfirmDialogRef | null>(null);

  useEffect(() => {
    if (isAppReady && routeManifest?.requireAuthentication && user?.isLoggedIn === false) {
      navigate(ERoute.Login);
    } else if (user?.isLoggedIn && user.isAdministrator) {
      dispatch(setAdministratorMode(true));
    }
  }, [isAppReady, user]);

  useEffect(() => {
    if (confirmDialogDialogRef.current) {
      window.confirmDialog = confirmDialogDialogRef.current.confirm;
    }
  }, [confirmDialogDialogRef.current]);

  const handleResourceNotFound = (err: any) => {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      navigate(ERoute.NotFound, {
        state: { resourceType: undefined, errors: [err.response.data.detail] },
        replace: true
      });
    }
  };

  return (
    <Box className={style.container}>
      <MainBar />
      <Container
        maxWidth={isFullScreenPage ? false : "lg"}
        sx={{ padding: isFullScreenPage ? "0 !important" : undefined }}
        className={style.inner}
      >
        <SWRConfig value={{ onError: handleResourceNotFound }}>
          <Routes>
            <Route path={ERoute.Home} Component={HomeScreen} />
            <Route path={ERoute.Login} Component={LoginPage} />
            <Route path={ERoute.Trip} Component={TripScreen} />
            <Route path={ERoute.UserProfile} Component={ProfilePage} />
            <Route path={ERoute.Error} Component={ErrorPage} />
            <Route path={ERoute.NotFound} Component={ResourceNotFoundPage} />
            <Route path="*" element={<Navigate to={ERoute.Home} />} />
          </Routes>
        </SWRConfig>
      </Container>

      {/* Global Scope utilities */}
      <ActionConfirmDialog dialogRef={confirmDialogDialogRef} />
    </Box>
  );
}

export default App;
