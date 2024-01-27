import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import BrokenRobotIcon from "src/assets/broken-robot.svg?react";

import { Error, KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import {
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";

import { ERoute } from "src/routes";

import style from "./ErrorPage.module.scss";
import messages from "./messages";

type TErrorState = {
  errors: string[];
};

type TProps = Partial<TErrorState>;

export default function ErrorPage(props: TProps) {
  const [isErrorsShown, setIsErrorsShown] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { errors = [] } = (state as TErrorState) || props || {};

  useEffect(() => {
    if (errors?.length === 0) {
      navigate(ERoute.Home);
    }
  }, [errors]);

  if (errors?.length === 0) {
    return null;
  }

  return (
    <div className={style.root}>
      <Grid container maxWidth="md" spacing={3} classes={{ root: style.container }}>
        <Grid item md={6} xs={12} classes={{ root: style.icon }}>
          <BrokenRobotIcon />
        </Grid>
        <Grid item md={6} xs={12} classes={{ root: style.text }}>
          <Grid container columns={2}>
            <Grid item>
              <Typography variant="h2" classes={{ h2: style.header }}>
                <FormattedMessage {...messages.header} />
              </Typography>
            </Grid>
            <Grid item width="100%">
              <Typography variant="subtitle1">
                <FormattedMessage {...messages.subtitle} values={{ errorCount: errors?.length }} />
                <div
                  onClick={() => setIsErrorsShown(!isErrorsShown)}
                  className={style.toggleErrors}
                >
                  <FormattedMessage {...messages.errors[isErrorsShown ? "hide" : "show"]} />
                  {isErrorsShown ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                </div>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12}>
          <Collapse in={isErrorsShown} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {errors.map((error) => (
                <ListItemButton sx={{ pl: 4 }} disableRipple>
                  <ListItemIcon>
                    <Error />
                  </ListItemIcon>
                  <ListItemText primary={error} color="common.onBackground" />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Grid>
      </Grid>
    </div>
  );
}
