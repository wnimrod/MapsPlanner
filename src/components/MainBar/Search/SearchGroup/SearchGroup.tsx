import { useMemo } from "react";
import { FormattedMessage } from "react-intl";

import { Map as MapIcon, Person as PersonIcon, Search as SearchIcon } from "@mui/icons-material";
import { AutocompleteRenderGroupParams, Divider } from "@mui/material";

import { ESearchScope } from "../types";
import style from "./SearchGroup.module.scss";
import messages from "./messages";

export default function SearchGroup({ key, group, children }: AutocompleteRenderGroupParams) {
  const scope = Number(group) as ESearchScope;

  const Icon = useMemo(() => {
    switch (scope) {
      case ESearchScope.Users:
        return PersonIcon;
      case ESearchScope.Trips:
        return MapIcon;
      default:
        return SearchIcon;
    }
  }, [scope]);

  return (
    <li key={key}>
      <div className={style.header}>
        <Icon />
        <FormattedMessage {...messages[scope]} />
      </div>
      <Divider sx={{ width: "100%" }} />
      <ul className={style.items}>{children}</ul>
    </li>
  );
}
