export type TCreateTripForm = {
  name: string;
  description: string;
  pictureSource: "file" | "url";
  picture: string;
};
