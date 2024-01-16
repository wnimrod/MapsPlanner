import { useMemo } from "react";
import { useParams as useParams_Native } from "react-router-dom";

import * as yup from "yup";

export default function useParams(schema: yup.Schema) {
  /**
   * Just like native react-route `useParams`,
   * But also validate a schema and convert it.
   */
  const params = useParams_Native();

  return useMemo(() => schema.validateSync(params), [params, schema]);
}
