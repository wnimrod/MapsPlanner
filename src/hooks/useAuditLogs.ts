import { TAPIAuditCard, TAPIAuditFilter } from "src/api/audit";
import * as auditLogsAPI from "src/api/audit";
import { TRootState } from "src/store/types";
import useSWR from "swr";

import { useSelector } from "react-redux";

import type { TBaseFetchOptions } from "./types";

type TOptions = TBaseFetchOptions & {
  filter?: TAPIAuditFilter;
};

export default function useAuditLogs({ shouldFetch = true, filter }: TOptions = {}) {
  const administratorMode = useSelector((state: TRootState) => state.global.administratorMode);
  const fetchKey = shouldFetch ? ["audit-logs", administratorMode, filter] : null;

  const {
    data: auditLogs,
    isLoading,
    error
  } = useSWR<TAPIAuditCard[]>(fetchKey, () => auditLogsAPI.fetchAuditLogs(filter));

  return { auditLogs, isLoading, error };
}
