import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

import { FormattedMessage, useIntl } from "react-intl";

import style from "../AddTripModal.module.scss";
import messages from "../messages";
import { TCreateTripForm } from "../types";
import { TCommonProps } from "./types";

export default function PictureSource({
  field,
  value,
  onChange
}: TCommonProps<TCreateTripForm["pictureSource"]>) {
  const { formatMessage } = useIntl();
  return (
    <FormControl className={style[field]}>
      <FormLabel>
        <FormattedMessage {...messages.form.picture.source.label} />
      </FormLabel>
      <RadioGroup defaultValue={value} name={field} row onChange={onChange}>
        {["file", "url"].map((source) => (
          <FormControlLabel
            checked={value === source}
            value={source}
            control={<Radio />}
            label={formatMessage(messages.form.picture.source[source])}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
