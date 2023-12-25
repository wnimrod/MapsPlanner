import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

export enum ETripCardActions {
  Delete
}

export function ContextMenu({ handleClose, ...menuProps }: any) {
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
