import { TMenuItem as TUIMenuItem } from "src/ui/molecules/Menu/MenuItem/types";

export enum ETripCardActions {
  Delete,
  Edit,
  GenerateMarkers
}

export type TMenuItem = TUIMenuItem<ETripCardActions>;
