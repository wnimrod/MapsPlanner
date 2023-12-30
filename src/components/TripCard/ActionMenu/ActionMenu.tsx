import { ListItemIcon, ListItemText, Menu, MenuItem, MenuProps } from "@mui/material";

import { useIntl } from "react-intl";

import { ETripCardActions, TMenuItem } from "../TripCard/types";
import messages from "./messages";

type TProps = {
  actions: TMenuItem[];
  handleClose: (action: ETripCardActions) => void;
} & MenuProps;

export function ActionMenu({ actions, handleClose, ...menuProps }: TProps) {
  const { formatMessage } = useIntl();

  return (
    <Menu {...menuProps}>
      {actions.map(({ action, icon: Icon }) => (
        <MenuItem onClick={() => handleClose(action)}>
          {Icon && <ListItemIcon>{<Icon />}</ListItemIcon>}
          <ListItemText primary={formatMessage(messages[action])} />
        </MenuItem>
      ))}
    </Menu>
  );
}
