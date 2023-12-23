import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";

import style from "./MainBar.module.scss";
import UserProfile from "./UserProfile";

export default function MainBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={style.label}>
          <MapIcon />
          Maps Planner
        </Typography>
        <UserProfile />
      </Toolbar>
    </AppBar>
  );
}
