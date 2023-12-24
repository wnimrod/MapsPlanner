import { Box } from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import MainBar from "./components/MainBar/MainBar";
import Map from "./components/Map/Map";
import SideMenu from "./components/SideMenu/SideMenu";
import SystemAlert from "./components/SystemAlert/SystemAlert";
import { setIsAppReady } from "./store/global";
import { AppDispatch } from "./store/store";
import { TRootState, TUserState } from "./store/types";
import { fetchCurrentUserThunk } from "./store/user";
import { delay } from "./utils/utils";
import AppLoading from "./views/AppLoading/AppLoading";
import LoginPage from "./views/LoginPage/LoginPage";

function App() {
  const isAppReady: boolean = useSelector((state: TRootState) => state.global.isAppReady);
  const user: TUserState = useSelector((state: TRootState) => state.user);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const initializeApp = async () => {
    const actions = [delay(2500), dispatch(fetchCurrentUserThunk())];
    await Promise.all(actions);
    dispatch(setIsAppReady(true));
  };

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (isAppReady && user?.isLoggedIn === false) {
      navigate("/login");
    }
  }, [isAppReady, user]);

  return (
    <Box>
      <AppLoading />
      <SystemAlert />
      <MainBar />
      <SideMenu />
      <Routes>
        <Route path="/" Component={() => <div>Hello world</div>}></Route>
        <Route path="/map/:id" Component={Map} />
        <Route path="/login" Component={LoginPage} />
      </Routes>
    </Box>
  );
}

export default App;
