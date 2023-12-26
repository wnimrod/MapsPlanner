import { Box, Container } from "@mui/material";
import { ERoute, useIsFullScreenRoute } from "src/routes.ts";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import style from "./App.module.scss";
import MainBar from "./components/MainBar/MainBar";
import SystemAlert from "./components/SystemAlert/SystemAlert";
import useCurrentUser from "./hooks/useCurrentUser";
import { TRootState } from "./store/types";
import HomeScreen from "./views/HomeScreen/HomeScreen";
import LoginPage from "./views/LoginPage/LoginPage";
import TripScreen from "./views/TripScreen/TripScreen";

function App() {
  const isAppReady: boolean = useSelector((state: TRootState) => state.global.isAppReady);
  const isFullScreenPage = useIsFullScreenRoute();

  const { user } = useCurrentUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAppReady && user?.isLoggedIn === false) {
      navigate(ERoute.Login);
    }
  }, [isAppReady, user]);

  return (
    <Box className={style.container}>
      <SystemAlert />
      <MainBar />
      <Container maxWidth={isFullScreenPage ? false : "lg"}>
        <Routes>
          <Route path={ERoute.Home} Component={HomeScreen} />
          <Route path={ERoute.Login} Component={LoginPage} />
          <Route path={ERoute.Trip} Component={TripScreen} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
