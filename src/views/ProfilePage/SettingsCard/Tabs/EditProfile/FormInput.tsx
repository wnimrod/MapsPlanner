import { useIntl } from "react-intl";

import { Box, TextField, TextFieldProps } from "@mui/material";

import { useFormik } from "formik";

import messages from "./messages";

type TProps = {
  name: string;
  value: any;
  onChange: ReturnType<typeof useFormik>["handleChange"];
} & TextFieldProps;

export default function FormInput({ name, value, onChange, ...textFieldProps }: TProps) {
  const { formatMessage } = useIntl();

  return (
    <Box>
      <TextField
        label={formatMessage(messages.fields[name].label)}
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        {...textFieldProps}
      />
    </Box>
  );
}
