import { SvgIconComponent } from "@mui/icons-material";

export enum ETripCardActions {
  Delete,
  Edit,
  GenerateMarkers
}

export type TMenuItem = {
  action: ETripCardActions;
  icon?: SvgIconComponent;
};
