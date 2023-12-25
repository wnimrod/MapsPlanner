import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { Switch, Tooltip, useColorScheme } from "@mui/material";
import { setAdministratorMode } from "src/store/global";
import { AppDispatch } from "src/store/store";
import { TRootState } from "src/store/types";

import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./ToggleAdminMode.module.scss";

export default function ToggleAdminMode() {
  const administratorMode = useSelector((state: TRootState) => state.global.administratorMode);
  const dispatch: AppDispatch = useDispatch();

  const handleToggle = (_: ChangeEvent<HTMLInputElement>, isAdmin: boolean) => {
    dispatch(setAdministratorMode(isAdmin));
  };

  return (
    <Tooltip title="Administrator Mode" placement="left">
      <div className={style.container}>
        {administratorMode ? <AdminPanelSettingsIcon /> : <AdminPanelSettingsOutlinedIcon />}
        <Switch onChange={handleToggle} checked={administratorMode} />
      </div>
    </Tooltip>
  );
}
