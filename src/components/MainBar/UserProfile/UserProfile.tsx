import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";

import { AccountCircle, AdminPanelSettings } from "@mui/icons-material";
import { Avatar, Badge, IconButton, Tooltip } from "@mui/material";

import { enqueueSnackbar } from "notistack";

import { logout } from "src/api/auth/auth";
import useCurrentUser from "src/hooks/useCurrentUser";
import useMenuManifest from "src/hooks/useMenuManifest";
import { ERoute } from "src/routes";
import { TRootState } from "src/store/types";
import { Menu } from "src/ui/molecules";
import { TMenuItem } from "src/ui/molecules/Menu/MenuItem/types";
import { ConditionalWrap, delay } from "src/utils/utils";

import style from "./UserProfile.module.scss";
import { userMenuEntries } from "./manifest";
import messages from "./messages";
import { EUserMenuEntry } from "./types";

export default function UserProfile() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const { user } = useCurrentUser();
  const isAdministratorMode = useSelector((state: TRootState) => state.global.administratorMode);

  const [anchorElUserProfile, setAnchorElUserProfile] = useState<null | HTMLElement>(null);

  const menuItems = useMenuManifest(userMenuEntries);

  const handleOpenUserProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserProfile(event.currentTarget);
  };

  const handleMenuItemSelected = async ({ key }: TMenuItem) => {
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
          enqueueSnackbar({ message: formatMessage(messages.errors.logout), variant: "error" });
        }
        break;
      default:
        break;
    }
  };

  const AdministratorBadgeWrapper = (children: React.ReactNode) => (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      classes={{ root: style.badge }}
      badgeContent={
        <Tooltip title={formatMessage(messages.labels.adminMode)}>
          <AdminPanelSettings classes={{ root: style.administratorBadge }} />
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
        items={menuItems}
        open={Boolean(anchorElUserProfile)}
        onItemSelected={handleMenuItemSelected}
        onClose={() => setAnchorElUserProfile(null)}
        anchorEl={anchorElUserProfile}
        messages={messages.labels}
        sx={{ mt: "45px" }}
      />
    </>
  );
}
