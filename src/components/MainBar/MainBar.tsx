import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { ERoute, useIsFullScreenRoute } from "src/routes";
import { setIsSideMenuOpen } from "src/store/global";
import { AppDispatch } from "src/store/store";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserProfile from "../UserProfile/UserProfile";
import style from "./MainBar.module.scss";

export default function MainBar() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isFullScreenPage = useIsFullScreenRoute();

  return (
    <AppBar position="sticky">
      <Container className={style.container} maxWidth={isFullScreenPage ? false : "lg"}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(setIsSideMenuOpen(true))}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={style["label-container"]} variant="h6">
            <div className={style.label} onClick={() => navigate(ERoute.Home)}>
              <MapIcon />
              Maps Planner
            </div>
          </Typography>

          <UserProfile />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
