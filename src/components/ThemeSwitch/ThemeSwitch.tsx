import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Switch, Tooltip, useColorScheme } from "@mui/material";

import { ChangeEvent } from "react";

import style from "./ThemeSwitch.module.scss";

export default function ThemeSwtich() {
  const { mode, setMode } = useColorScheme();

  function toggleMode(_: ChangeEvent<HTMLInputElement>, isDarkMode: boolean) {
    setMode(isDarkMode ? "dark" : "light");
  }

  return (
    <Tooltip title="Switch themes" placement="left">
      <div className={style.container}>
        {mode == "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        <Switch onChange={toggleMode} checked={mode === "dark"} />
      </div>
    </Tooltip>
  );
}
