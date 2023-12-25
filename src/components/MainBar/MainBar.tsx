import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { setIsSideMenuOpen } from "src/store/global";
import { AppDispatch } from "src/store/store";

import { useDispatch } from "react-redux";

import style from "./MainBar.module.scss";
import UserProfile from "../UserProfile/UserProfile";

export default function MainBar() {
  const dispatch: AppDispatch = useDispatch();

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
        <Typography variant="h6" className={style.label}>
          <MapIcon />
          Maps Planner
        </Typography>
        <UserProfile />
      </Toolbar>
      </Container>
    </AppBar>
  );
}
