import api, { unwrapAxiosResult } from "../axios";
import { TBaseAPIFilter } from "../types";
import { EAuditAction, TAPIAuditCard, TTargetModel } from "./types";

export type TAPIAuditFilter = TBaseAPIFilter &
  Partial<{
    action: EAuditAction;
    targetModel: TTargetModel;
    targetId: number;
  }>;

const API_PREFIX = "/audit";

export async function fetchAuditLogs(filter: TAPIAuditFilter = {}) {
  const result = await api.get<TAPIAuditCard[]>(`${API_PREFIX}/`, {
    params: filter
  });
  return unwrapAxiosResult(result);
}
