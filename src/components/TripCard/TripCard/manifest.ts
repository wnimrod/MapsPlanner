import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ETripCardActions, TMenuItem } from "./types";

export const tripCardActionManifest: TMenuItem[] = [
  { key: ETripCardActions.Delete, icon: DeleteIcon },
  { key: ETripCardActions.Edit, icon: EditIcon }
];

export const [ACTION_DELETE, ACTION_EDIT] = tripCardActionManifest;
