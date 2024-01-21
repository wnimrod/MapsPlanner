import { TBaseAPIFilter } from "../types";

export enum EAuditAction {
  Creation = 1,
  Modification,
  Deletion,
  ChatGPTQuery
}

export type TTargetModel = "AuditLogORM" | "MarkerORM" | "SessionORM" | "TripORM" | "UserORM";

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
