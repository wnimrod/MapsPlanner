export enum ESearchScope {
  All,
  Off,
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
