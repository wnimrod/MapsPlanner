import { ChangeEvent } from "react";
import {
  URLSearchParamsInit,
  useSearchParams as reactRouterDomUseSearchParams
} from "react-router-dom";

export enum EGlobalSearchParams {
  Search = "search"
}

export default function useSearchParams(defaultInit?: URLSearchParamsInit) {
  const [searchParams, setSearchParams] = reactRouterDomUseSearchParams(defaultInit);

  const handleSearchParamChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const name = event.target.getAttribute("name");

    if (!name) {
      throw new Error("You must set element name in order to use this callback.");
    }

    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }

    setSearchParams(searchParams);
  };

  return { searchParams, setSearchParams, handleSearchParamChange };
}
