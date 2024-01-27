import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import MapIcon from "@mui/icons-material/Map";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

import useCurrentUser from "src/hooks/useCurrentUser";
import { ERoute, useCurrentRoute } from "src/routes";

import style from "./MainBar.module.scss";
import Search from "./Search/Search";
import UserProfile from "./UserProfile/UserProfile";
import messages from "./messages";

export default function MainBar() {
  const { formatMessage } = useIntl();

  const navigate = useNavigate();
  const { route, manifest: routeManifest } = useCurrentRoute();

  const { isLoggedIn } = useCurrentUser();

  if (!routeManifest?.withMainBar) return null;

  return (
    <AppBar position="sticky" classes={{ root: style.appBar }}>
      <Container className={style.container} maxWidth={routeManifest?.isFullscreen ? false : "lg"}>
        <Toolbar classes={{ root: style.toolbar }}>
          <Typography className={style.labelContainer} variant="h6">
            <div className={style.label} onClick={() => navigate(ERoute.Home)}>
              <MapIcon />
              Maps Planner
            </div>
          </Typography>
          {isLoggedIn && (
            <Search
              classes={{ autocomplete: { root: style.search } }}
              placeholder={formatMessage(
                !!route && route in messages.search
                  ? messages.search[route]
                  : messages.search.default
              )}
            />
          )}
          <UserProfile />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
