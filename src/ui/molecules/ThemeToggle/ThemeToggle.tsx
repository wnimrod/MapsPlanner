import { ChangeEvent } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Switch, Tooltip, useColorScheme } from "@mui/material";

import { EColorScheme } from "src/hooks/useColorScheme";

import style from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  function toggleMode(_: ChangeEvent<HTMLInputElement>, isDarkMode: boolean) {
    setColorScheme(isDarkMode ? "dark" : "light");
  }

  return (
    <Tooltip title="Switch themes" placement="left">
      <div className={style.container}>
        {colorScheme == EColorScheme.Dark ? <DarkModeIcon /> : <LightModeIcon />}
        <Switch onChange={toggleMode} checked={colorScheme === "dark"} />
      </div>
    </Tooltip>
  );
}
