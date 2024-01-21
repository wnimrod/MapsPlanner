export type TAPIUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string; // as url
  isActive: boolean;
  isAdministrator: boolean;
};

export enum EGender {
  male = 1,
  female = 2
}

export type TAPIUserProfile = {
  registerDate: Date;
  fullName: string;
  totalTrips: number;
  totalMarkers: number;
  gender: EGender;
  birthDate: Date;
} & TAPIUser;

export type TAPIUpdateUserRequest = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  birthDate: Date;
  gender: EGender;
}>;
