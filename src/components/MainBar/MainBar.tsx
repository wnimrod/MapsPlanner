import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import useSearchParams, { EGlobalSearchParams } from "src/hooks/useSearchParams";
import { ERoute, useIsFullScreenRoute } from "src/routes";
import { setIsSideMenuOpen } from "src/store/global";
import { AppDispatch } from "src/store/store";

import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserProfile from "../UserProfile/UserProfile";
import style from "./MainBar.module.scss";
import messages from "./messages";

export default function MainBar() {
  const { formatMessage } = useIntl();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isFullScreenPage = useIsFullScreenRoute();
  const { searchParams, handleSearchParamChange } = useSearchParams({
    [EGlobalSearchParams.Search]: ""
  });

  return (
    <AppBar position="sticky">
      <Container className={style.container} maxWidth={isFullScreenPage ? false : "lg"}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(setIsSideMenuOpen(true))}
          >
            <MenuIcon />
          </IconButton>

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
            variant="outlined"
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
