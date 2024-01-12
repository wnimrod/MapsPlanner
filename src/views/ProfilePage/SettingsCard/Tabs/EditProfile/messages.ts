import { injectMessageIds } from "src/utils/utils";

const scope = "views.ProfilePage.SettingsCard.Tabs.EditProfile";

export default injectMessageIds(scope, {
  fields: {
    firstName: {
      label: "First Name",
      validation: {
        tooShort: "Min length is {minLength}."
      }
    },
    lastName: {
      label: "Last Name",
      validation: {
        tooShort: "Min length is {minLength}."
      }
    },
    email: {
      label: "Email",
      validation: {
        invalid: "This is not a valid email address."
      }
    },
    birthDate: {
      label: "Birth Date",
      validation: {
        invalid: "This is not a valid date.",
        future: "You surely didn't born in the future :)"
      }
    },
    gender: {
      label: "Gender",
      male: "Male",
      female: "Female"
    }
  },
  submit: "Save",
  editSuccess: "Profile Changes submitted.",
  editFailed: "Failed to submit changes. Please try again."
}) as any;
