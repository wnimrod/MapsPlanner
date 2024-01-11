import { AccountCircle } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import useCurrentUser from "src/hooks/useCurrentUser";
import { ERoute } from "src/routes";

import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { generatePath, useNavigate } from "react-router-dom";

import style from "./UserProfile.module.scss";
import { userMenuEntries } from "./manifest";
import messages from "./messages";
import { EUserMenuEntry, TUserMenuEntry } from "./types";

export default function UserProfile() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  const [anchorElUserProfile, setAnchorElUserProfile] = useState<null | HTMLElement>(null);

  const handleOpenUserProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserProfile(event.currentTarget);
  };

  const handleMenuItemSelected = (key: EUserMenuEntry) => {
    switch (key) {
      case EUserMenuEntry.Profile:
        navigate(generatePath(ERoute.UserProfile));
        setAnchorElUserProfile(null);
        break;
      default:
        break;
    }
  };

  const filterSettingsEntry = (menuEntry: TUserMenuEntry) => {
    if (menuEntry.public) {
      return true;
    } else if (user?.isLoggedIn) {
      return menuEntry.administratorOnly ? user.isAdministrator : true;
    } else {
      return false;
    }
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpenUserProfileMenu}>
        {user?.isLoggedIn ? (
          <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.profilePicture} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUserProfile}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(anchorElUserProfile)}
        onClose={() => setAnchorElUserProfile(null)}
      >
        {userMenuEntries.filter(filterSettingsEntry).map(({ key, icon, render }) => (
          <MenuItem
            key={key}
            onClick={() => handleMenuItemSelected(key)}
            className={style.menuItem}
          >
            {icon}
            {render?.(key) || (
              <Typography textAlign="center">
                <FormattedMessage {...messages.labels[key]} />
              </Typography>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
