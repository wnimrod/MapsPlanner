import React, { useMemo } from "react";

import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
  Typography
} from "@mui/material";

import { isFunctionalComponent } from "src/utils/utils";

import style from "./MenuItem.module.scss";
import { TMenuItem, TMenuItemKey } from "./types";

type TProps<TKey extends TMenuItemKey> = {
  item: TMenuItem<TKey>;
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, key?: TKey) => void;
  children?: React.FC | React.ReactNode;
} & MuiMenuItemProps;

export default function MenuItem<TKey extends TMenuItemKey = string>({
  item,
  onClick,
  children: _children,
  ...menuProps
}: TProps<TKey>) {
  const { key, icon: Icon, render } = item;

  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (onClick) {
      return onClick(event, key);
    }
  };

  const children = useMemo(() => {
    if (isFunctionalComponent(_children)) {
      const Children = _children as React.FC;
      return <Children />;
    } else {
      return _children;
    }
  }, [_children]) as React.ReactNode;

  return (
    <MuiMenuItem key={key} onClick={handleClick} classes={{ root: style.menuItem }} {...menuProps}>
      {Icon && <Icon />}
      <Typography textAlign="center">{children || render?.(key)}</Typography>
    </MuiMenuItem>
  );
}
