import { AccountCircle } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Avatar, Badge, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { logout } from "src/api/auth";
import useCurrentUser from "src/hooks/useCurrentUser";
import { ERoute } from "src/routes";
import { TRootState } from "src/store/types";
import { ConditionalWrap, delay } from "src/utils/utils";

import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";

import style from "./UserProfile.module.scss";
import { userMenuEntries } from "./manifest";
import messages from "./messages";
import { EUserMenuEntry, TUserMenuEntry } from "./types";

export default function UserProfile() {
  const { formatMessage } = useIntl();
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  const isAdministratorMode = useSelector((state: TRootState) => state.global.administratorMode);

  const [anchorElUserProfile, setAnchorElUserProfile] = useState<null | HTMLElement>(null);

  const handleOpenUserProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserProfile(event.currentTarget);
  };

  const handleMenuItemSelected = async (key: EUserMenuEntry) => {
    switch (key) {
      case EUserMenuEntry.Profile:
        navigate(generatePath(ERoute.UserProfile));
        setAnchorElUserProfile(null);
        break;
      case EUserMenuEntry.Logout:
        try {
          await logout();
          await delay(0);
          navigate(ERoute.Login);
        } catch (error) {
          enqueueSnackbar({
            message: formatMessage(messages.errors.logout),
            variant: "error"
          });
        }
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

  const AdministratorBadgeWrapper = (children: React.ReactNode) => (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      classes={{ root: style.badge }}
      badgeContent={
        <Tooltip title={formatMessage(messages.labels.adminMode)}>
          <AdminPanelSettingsIcon classes={{ root: style.administratorBadge }} />
        </Tooltip>
      }
    >
      {children}
    </Badge>
  );

  return (
    <>
      <IconButton size="large" onClick={handleOpenUserProfileMenu}>
        <ConditionalWrap condition={isAdministratorMode} wrapper={AdministratorBadgeWrapper}>
          {user?.isLoggedIn ? (
            <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.profilePicture} />
          ) : (
            <AccountCircle />
          )}
        </ConditionalWrap>
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
