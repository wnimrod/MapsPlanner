import React, { useMemo } from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { generatePath, useNavigate } from "react-router-dom";

import {
  Autocomplete,
  AutocompleteClasses,
  AutocompleteProps,
  CircularProgress,
  TextField,
  TextFieldClasses
} from "@mui/material";

import { useAsyncMemo } from "use-async-memo";

import { TAPITripCard, searchTrip } from "src/api/trips";
import { TAPIUser, searchUser } from "src/api/users";
import useSearchParams, { EGlobalSearchParams } from "src/hooks/useSearchParams";
import { ERoute } from "src/routes";

import SearchGroup from "./SearchGroup/SearchGroup";
import messages from "./messages";
import { ESearchScope, TSearchOption } from "./types";

type TProps = {
  scopes?: ESearchScope.All | ESearchScope[];
  placeholder?: string;
  classes?: Partial<{
    autocomplete: Partial<AutocompleteClasses>;
    textField: Partial<TextFieldClasses>;
  }>;
};

const SCOPE_SEARCHERS: [ESearchScope, (search: string) => Promise<TAPITripCard[] | TAPIUser[]>][] =
  [
    [ESearchScope.Trips, searchTrip],
    [ESearchScope.Users, searchUser]
  ];

const SCOPE_TO_PATH_MAPPER: Partial<Record<ESearchScope, ERoute>> = {
  [ESearchScope.Trips]: ERoute.Trip,
  [ESearchScope.Users]: ERoute.UserProfile
};

export default function Search({ scopes = ESearchScope.All, placeholder, classes = {} }: TProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { searchParams, handleSearchParamChange } = useSearchParams({
    [EGlobalSearchParams.Search]: ""
  });

  const query = searchParams.get(EGlobalSearchParams.Search) || "";

  const navigate = useNavigate();

  const scopeSearchers = useMemo(() => {
    if (scopes == ESearchScope.All) {
      return SCOPE_SEARCHERS;
    } else {
      return SCOPE_SEARCHERS.filter(([scope]) => scopes.includes(scope));
    }
  }, [scopes]);

  const options = useAsyncMemo(
    async () => {
      if (query.length < 3) {
        return options;
      }

      try {
        setIsLoading(true);
        const results = await Promise.all(
          scopeSearchers.map(([scope, searcher]) =>
            searcher(query).then((results) =>
              results.map(({ id, name, fullName }) => ({ id, name: name || fullName, scope }))
            )
          )
        );

        return results.reduce((acc, nextGroup) => [...acc, ...nextGroup], []);
      } finally {
        setIsLoading(false);
      }
    },

    [query, scopeSearchers],
    []
  ) as TSearchOption[];

  function handleSearchItemSelected(
    event: React.SyntheticEvent<Element, Event>,
    selection: TSearchOption | null
  ) {
    if (selection && SCOPE_TO_PATH_MAPPER[selection.scope]) {
      return navigate(
        generatePath(SCOPE_TO_PATH_MAPPER[selection.scope]!, {
          id: String(selection.id),
          tab: null
        })
      );
    }
  }

  return (
    <Autocomplete
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      options={options}
      getOptionLabel={({ id, name }: TSearchOption) => `[#${id}] ${name}`}
      groupBy={({ scope }) => String(scope)}
      renderGroup={(params) => <SearchGroup {...params} />}
      classes={classes.autocomplete}
      size="small"
      clearOnBlur={false}
      inputValue={query}
      loading={isLoading}
      onChange={handleSearchItemSelected}
      noOptionsText={<FormattedMessage {...messages.noResults} />}
      renderInput={(params) => (
        <TextField
          {...params}
          name="search"
          placeholder={placeholder}
          onChange={handleSearchParamChange}
          classes={classes.textField}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}
