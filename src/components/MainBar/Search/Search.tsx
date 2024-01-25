import React, { useMemo } from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { generatePath, useNavigate } from "react-router-dom";

import {
  Autocomplete,
  AutocompleteClasses,
  CircularProgress,
  TextField,
  TextFieldClasses
} from "@mui/material";

import { useAsyncMemo } from "use-async-memo";

import { TAPITripCard, TAPIUserProfile } from "src/api/types";
import useSearchParams, { EGlobalSearchParams } from "src/hooks/useSearchParams";

import SearchGroup from "./SearchGroup/SearchGroup";
import { SCOPE_SEARCHERS, SCOPE_TO_PATH_MAPPER } from "./constants";
import messages from "./messages";
import { ESearchScope, TSearchOption } from "./types";

type TProps = {
  asyncSearch?: boolean;
  scopes?: ESearchScope.All | ESearchScope[];
  placeholder?: string;
  classes?: Partial<{
    autocomplete: Partial<AutocompleteClasses>;
    textField: Partial<TextFieldClasses>;
  }>;
};

export default function Search({
  asyncSearch = true,
  scopes = ESearchScope.All,
  placeholder,
  classes = {}
}: TProps) {
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

  const performSearch = async () => {
    const results = await Promise.all(
      scopeSearchers.map(([scope, searcher]) =>
        searcher(query).then((results) =>
          results.map((result) => ({
            id: result,
            name: (result as TAPITripCard)?.name || (result as TAPIUserProfile)?.fullName,
            scope
          }))
        )
      )
    );

    return results.reduce((acc, nextGroup) => [...acc, ...nextGroup], []);
  };

  const options = useAsyncMemo(
    async () => {
      if (!asyncSearch) {
        return null;
      } else if (query.length < 3) {
        return options;
      }

      try {
        setIsLoading(true);
        const results = await performSearch();
        return results;
      } finally {
        setIsLoading(false);
      }
    },

    [asyncSearch, query, scopeSearchers],
    []
  ) as TSearchOption[];

  const handleSearchItemSelected = (
    _: React.SyntheticEvent<Element, Event>,
    selection: TSearchOption | null
  ) => {
    if (selection && SCOPE_TO_PATH_MAPPER[selection.scope]) {
      return navigate(
        generatePath(SCOPE_TO_PATH_MAPPER[selection.scope]!, {
          id: String(selection.id),
          tab: null
        })
      );
    }
  };

  return (
    <Autocomplete
      open={asyncSearch && isOpen}
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
