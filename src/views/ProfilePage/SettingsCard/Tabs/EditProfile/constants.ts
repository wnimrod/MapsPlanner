import * as Yup from "yup";

import { useIntl } from "react-intl";

import messages from "./messages";

type TFormatMessage = ReturnType<typeof useIntl>["formatMessage"];

export const validationSchema = (formatMessage: TFormatMessage) => {
  const { firstName, lastName, email, birthDate } = messages.fields;

  return Yup.object().shape({
    firstName: Yup.string()
      .min(2, formatMessage(firstName.validation.tooShort, { minLength: 2 }))
      .required(formatMessage(firstName.validation.tooShort, { minLength: 2 })),
    lastName: Yup.string()
      .min(2, formatMessage(lastName.validation.tooShort, { minLength: 2 }))
      .required(formatMessage(lastName.validation.tooShort, { minLength: 2 })),
    email: Yup.string().email(formatMessage(email.validation.invalid)).required(),
    birthDate: Yup.date().max(new Date(), formatMessage(birthDate.validation.future)).required()
  });
};
