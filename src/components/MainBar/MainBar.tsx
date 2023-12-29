import MapIcon from "@mui/icons-material/Map";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Container, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import useSearchParams, { EGlobalSearchParams } from "src/hooks/useSearchParams";
import { ERoute, useIsFullScreenRoute } from "src/routes";

import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import UserProfile from "../UserProfile/UserProfile";
import style from "./MainBar.module.scss";
import messages from "./messages";

export default function MainBar() {
  const { formatMessage } = useIntl();

  const navigate = useNavigate();
  const isFullScreenPage = useIsFullScreenRoute();
  const { searchParams, handleSearchParamChange } = useSearchParams({
    [EGlobalSearchParams.Search]: ""
  });

  return (
    <AppBar position="sticky">
      <Container className={style.container} maxWidth={isFullScreenPage ? false : "lg"}>
        <Toolbar>
          <Typography className={style.labelContainer} variant="h6">
            <div className={style.label} onClick={() => navigate(ERoute.Home)}>
              <MapIcon />
              Maps Planner
            </div>
          </Typography>

          <TextField
            placeholder={formatMessage(messages.search)}
            value={searchParams.get(EGlobalSearchParams.Search)}
            name={EGlobalSearchParams.Search}
            onChange={handleSearchParamChange}
            classes={{ root: style.searchBar }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: 2 }}>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <UserProfile />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
