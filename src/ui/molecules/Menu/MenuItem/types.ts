import { SvgIconComponent } from "@mui/icons-material";

export type TMenuItemKey = string | number;

export type TMenuItem<TKey extends TMenuItemKey = string> = {
  key: TKey;
  icon?: SvgIconComponent;
  render?: (key: TKey) => React.ReactNode;
};
