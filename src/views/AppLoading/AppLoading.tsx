import { Backdrop, Box, LinearProgress, Typography } from "@mui/material";

import style from "./AppLoading.module.scss";

type TProps = {
  isOpen: boolean;
};

export default function AppLoading({ isOpen }: TProps) {
  return (
    <Backdrop
      open={isOpen}
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
