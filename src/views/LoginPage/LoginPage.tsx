import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import MapsPlannerIcon from "src/assets/mapsplanner-logo.svg?react";

import MapIcon from "@mui/icons-material/Map";
import { Box, Grid, Typography } from "@mui/material";

import GoogleLoginButton from "src/components/GoogleLoginButton";

import useCurrentUser from "src/hooks/useCurrentUser";
import { ERoute } from "src/routes";

import style from "./LoginPage.module.scss";
import messages from "./messages";

export default function LoginPage() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate(ERoute.Home);
    }
  }, [user?.isLoggedIn]);

  return (
    <div className={style.container}>
      <Grid container maxWidth={450} classes={{ root: style.loginContainer }} columns={1}>
        <Grid item xs={1} classes={{ root: style.appIcon }}>
          <MapsPlannerIcon />
        </Grid>
        <Grid item xs={1} classes={{ root: style.loginForm }}>
          <Typography variant="h4" color="common.black" className={style.header}>
            <FormattedMessage {...messages.header} />
          </Typography>
          <Typography variant="subtitle1" color="common.black">
            <FormattedMessage {...messages.subtitle} />
          </Typography>
          <Box margin={2}>
            <MapIcon fontSize="large" />
          </Box>

          <GoogleLoginButton variant="outlined" size="large" />
        </Grid>
      </Grid>
    </div>
  );
}
