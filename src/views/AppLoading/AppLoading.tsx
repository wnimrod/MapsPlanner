import { Backdrop, Box, LinearProgress, Typography } from "@mui/material";
import { TRootState } from "src/store/types";

import { useSelector } from "react-redux";

import style from "./AppLoading.module.scss";

export default function AppLoading() {
  const isAppReady = useSelector((state: TRootState) => state.global.isAppReady);

  return (
    <Backdrop
      open={!isAppReady}
      className={style.backdrop}
      transitionDuration={{ appear: 0, exit: 500 }}
    >
      <Box className={style.container}>
        <Typography variant="h3" className={style.label}>
          App is Loading ...
        </Typography>
        <LinearProgress />
      </Box>
    </Backdrop>
  );
}
