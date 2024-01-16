import { FormattedMessage, MessageDescriptor } from "react-intl";

import { Menu as MuiMenu, MenuProps as MuiMenuProps } from "@mui/material";

import { MenuItem } from "src/ui/molecules";

import { TMenuItem, TMenuItemKey } from "./MenuItem/types";

type TProps<TKey extends TMenuItemKey> = {
  items: TMenuItem<TKey>[];
  onItemSelected: (item: TMenuItem<TKey>) => void;
  messages?: Record<TKey, MessageDescriptor>;
} & MuiMenuProps;

export default function Menu<TKey extends TMenuItemKey>(props: TProps<TKey>) {
  const { items, onItemSelected: handleItemSelected, messages, ...menuProps } = props;

  return (
    <MuiMenu
      keepMounted
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      {...menuProps}
    >
      {items.map((item) => (
        <MenuItem key={item.key} item={item} onClick={() => handleItemSelected(item)}>
          {messages?.[item.key] && <FormattedMessage {...messages[item.key]} />}
        </MenuItem>
      ))}
    </MuiMenu>
  );
}
