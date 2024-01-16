import { number, object, string } from "yup";

import useParams_Hook from "src/hooks/useParams";

import { ETab } from "./types";

export default function useParams() {
  const schema = object().shape({
    id: number().nullable().default(null),
    tab: string().nullable().default(ETab.Profile)
  });

  return useParams_Hook(schema);
}
