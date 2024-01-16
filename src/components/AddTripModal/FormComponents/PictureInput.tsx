import { ChangeEvent } from "react";

import { Button, TextField } from "@mui/material";

import { handleFileSelected } from "src/hooks/useUploadFile";

import { TCreateTripForm } from "../types";
import { TCommonProps } from "./types";

type TProps = TCommonProps<string> & {
  pictureSource: TCreateTripForm["pictureSource"];
  onChange: (picture: string) => void;
  error?: string;
};

export default function PictureInput({ field, value, pictureSource, error, onChange }: TProps) {
  if (pictureSource === "file") {
    const handleImageUploaded = (event: ChangeEvent<HTMLInputElement>) =>
      handleFileSelected(event)[0].then((picture: string) => onChange(picture));

    return (
      <Button variant="contained" component="label">
        Upload File
        <input type="file" name={field} hidden onChange={handleImageUploaded} />
      </Button>
    );
  } else if (pictureSource === "url") {
    return (
      <TextField
        fullWidth
        label="Image URL"
        value={value}
        name={field}
        onChange={onChange}
        error={!!error}
        helperText={error}
      />
    );
  } else {
    return null;
  }
}
