export enum ESearchScope {
  All,
  Users,
  Trips,
  Audit,
  Markers
}

export type TSearchOption = {
  id: number;
  name: string;
  scope: ESearchScope;
};
