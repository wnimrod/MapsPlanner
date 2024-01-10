import { Box, Container } from "@mui/material";
import { ERoute, useIsFullScreenRoute } from "src/routes.ts";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import style from "./App.module.scss";
import ActionConfirmDialog, {
  TActionConfirmDialogRef
} from "./components/ActionConfirmDialog/ActionConfirmDialog";
import MainBar from "./components/MainBar/MainBar";
import useCurrentUser from "./hooks/useCurrentUser";
import { setAdministratorMode } from "./store/global";
import { AppDispatch } from "./store/store";
import { TRootState } from "./store/types";
import HomeScreen from "./views/HomeScreen/HomeScreen";
import LoginPage from "./views/LoginPage/LoginPage";
import TripScreen from "./views/TripScreen/TripScreen";

function App() {
  const isAppReady: boolean = useSelector((state: TRootState) => state.global.isAppReady);
  const isFullScreenPage = useIsFullScreenRoute();

  const { user } = useCurrentUser();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const confirmDialogDialogRef = useRef<TActionConfirmDialogRef | null>(null);

  useEffect(() => {
    if (isAppReady && user?.isLoggedIn === false) {
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

  return (
    <Box className={style.container}>
      <MainBar />
      <Container
        maxWidth={isFullScreenPage ? false : "lg"}
        sx={{ padding: isFullScreenPage ? "0 !important" : undefined }}
      >
        <Routes>
          <Route path={ERoute.Home} Component={HomeScreen} />
          <Route path={ERoute.Login} Component={LoginPage} />
          <Route path={ERoute.Trip} Component={TripScreen} />
        </Routes>
      </Container>

      {/* Global Scope utilities */}
      <ActionConfirmDialog dialogRef={confirmDialogDialogRef} />
    </Box>
  );
}

export default App;
