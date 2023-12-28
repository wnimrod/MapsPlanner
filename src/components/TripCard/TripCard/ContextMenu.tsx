import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuProps } from "@mui/material";

export enum ETripCardActions {
  Delete
}

type TProps = {
  handleClose: (action: ETripCardActions) => void;
} & MenuProps;

export function ContextMenu({ handleClose, ...menuProps }: TProps) {
  return (
    <Menu {...menuProps}>
      <MenuItem onClick={() => handleClose(ETripCardActions.Delete)}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>
    </Menu>
  );
}
