import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { ERoute } from "src/routes";
import { setIsSideMenuOpen } from "src/store/global";
import { AppDispatch } from "src/store/store";

import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import UserProfile from "../UserProfile/UserProfile";
import style from "./MainBar.module.scss";

export default function MainBar() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
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

          <Typography variant="h6" className={style.label} onClick={() => navigate(ERoute.Home)}>
            <MapIcon />
            Maps Planner
          </Typography>

          <UserProfile />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
