import React from "react";

import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MapIcon from "@mui/icons-material/Map";

import { useSelector } from "react-redux";
import { TRootState } from "src/store/types";

import style from "./MainBar.module.scss";

export default function MainBar() {
  const user = useSelector((state: TRootState) => state.user);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={style.label}>
          <MapIcon />
          MapsPlanner
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
