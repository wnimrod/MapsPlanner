import { TCreateTripForm } from "../types";

export type TCommonProps<T> = {
  field: keyof TCreateTripForm;
  value: T;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
