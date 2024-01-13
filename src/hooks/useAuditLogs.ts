import { TAPIAuditCard, TAPIAuditFilter } from "src/api/audit";
import * as auditLogsAPI from "src/api/audit";
import useSWR from "swr";

import type { TBaseFetchOptions } from "./types";

type TOptions = TBaseFetchOptions & {
  filter?: TAPIAuditFilter;
};

export default function useAuditLogs({ shouldFetch = true, filter }: TOptions) {
  const fetchKey = shouldFetch ? ["audit-logs", filter] : null;

  const {
    data: auditLogs,
    isLoading,
    error
  } = useSWR<TAPIAuditCard[]>(fetchKey, () => auditLogsAPI.fetchAuditLogs(filter));

  return { auditLogs, isLoading, error };
}
