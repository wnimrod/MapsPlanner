import { useColorScheme as muiUseColorScheme } from "@mui/material";

export enum EColorScheme {
  Light = "light",
  Dark = "dark"
}

export default function useColorScheme() {
  const { mode: colorScheme, setMode: setColorScheme } = muiUseColorScheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return {
    colorScheme,
    setColorScheme,
    systemColorScheme: prefersDark ? EColorScheme.Dark : EColorScheme.Light
  };
}
