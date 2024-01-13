import api, { unwrapAxiosResult } from "./axios";
import { TBaseAPIFilter } from "./types";

export enum EAuditAction {
  Creation = 1,
  Modification,
  Deletion,
  ChatGPTQuery
}

type TTargetModel = "AuditLogORM" | "MarkerORM" | "SessionORM" | "TripORM" | "UserORM";
export type TAPIAuditCard = {
  id: number;
  creationDate: Date;
  action: EAuditAction;
  userId: number;
  target: { model: TTargetModel; id: number };
};

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
