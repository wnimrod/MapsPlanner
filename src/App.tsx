import { Box, Container } from "@mui/material";
import { ERoute } from "src/routes.ts";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import style from "./App.module.scss";
import MainBar from "./components/MainBar/MainBar";
import Map from "./components/Map/Map";
import SideMenu from "./components/SideMenu/SideMenu";
import SystemAlert from "./components/SystemAlert/SystemAlert";
import useCurrentUser from "./hooks/useCurrentUser";
import { setIsAppReady } from "./store/global";
import { AppDispatch } from "./store/store";
import { TRootState } from "./store/types";
import AppLoading from "./views/AppLoading/AppLoading";
import HomeScreen from "./views/HomeScreen/HomeScreen";
import LoginPage from "./views/LoginPage/LoginPage";

function App() {
  const isAppReady: boolean = useSelector((state: TRootState) => state.global.isAppReady);

  const { user, isLoading: isUserLoading } = useCurrentUser();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoading) {
      dispatch(setIsAppReady(true));
    }
  }, [isUserLoading]);

  useEffect(() => {
    if (isAppReady && user?.isLoggedIn === false) {
      navigate(ERoute.Login);
    }
  }, [isAppReady, user]);

  return (
    <Box className={style.container}>
      <AppLoading />
      <SystemAlert />
      <MainBar />
      <SideMenu />

      <Container maxWidth="lg">
        {isAppReady && (
          <Routes>
            <Route path={ERoute.Home} Component={HomeScreen}></Route>
            <Route path={ERoute.Login} Component={LoginPage} />
            <Route path={ERoute.Trip} Component={Map} />
          </Routes>
        )}
      </Container>
    </Box>
  );
}

export default App;
