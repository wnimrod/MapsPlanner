import { AccountCircle } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, IconButton, Menu, MenuItem, SvgIcon, Typography } from "@mui/material";
import { TRootState } from "src/store/types";

import { useState } from "react";
import { useSelector } from "react-redux";
import { To, useNavigate } from "react-router-dom";

import ThemeSwtich from "../ThemeSwitch/ThemeSwitch";
import style from "./UserProfile.module.scss";

type TProfileSettingsEntry = {
  label: string;
  icon: typeof SvgIcon;
  to: To;
};

export default function UserProfile() {
  const user = useSelector((state: TRootState) => state.user);
  const navigate = useNavigate();

  const [anchorElUserProfile, setAnchorElUserProfile] = useState<null | HTMLElement>(null);

  const handleOpenUserProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserProfile(event.currentTarget);
  };

  const handleMenuItemSelected = (item?: TProfileSettingsEntry) => {
    if (item) {
      navigate(item.to);
    }
    setAnchorElUserProfile(null);
  };

  const settingsMenuEntries: TProfileSettingsEntry[] = [
    {
      label: "Profile",
      icon: PersonIcon,
      to: "/settings/profile"
    }
  ];

  if (!user?.isLoggedIn) {
    return <AccountCircle />;
  }

  return (
    <>
      <IconButton size="large" onClick={handleOpenUserProfileMenu}>
        <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.profilePicture} />
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
        onClose={() => handleMenuItemSelected()}
      >
        {settingsMenuEntries.map((settingsEntry) => (
          <MenuItem
            key={settingsEntry.label}
            onClick={() => handleMenuItemSelected(settingsEntry)}
            className={style["menu-item"]}
          >
            <settingsEntry.icon />
            <Typography textAlign="center">{settingsEntry.label}</Typography>
          </MenuItem>
        ))}
        <MenuItem key="switch-theme">
          <ThemeSwtich />
        </MenuItem>
      </Menu>
    </>
  );
}
