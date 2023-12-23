import { AccountCircle } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { TRootState } from "src/store/types";

import { useState } from "react";
import { useSelector } from "react-redux";
import { To, useNavigate } from "react-router-dom";

type TProfileSettingsEntry = {
  label: string;
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
      label: "Edit Profile",
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
          <MenuItem key={settingsEntry.label} onClick={() => handleMenuItemSelected(settingsEntry)}>
            <Typography textAlign="center">{settingsEntry.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
