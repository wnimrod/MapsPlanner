declare type TTimestamp = string; // TODO: Format to iso and epohc

declare interface IAPIUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string; // as url
  isActive: boolean;
  isAdministrator: boolean;
}
