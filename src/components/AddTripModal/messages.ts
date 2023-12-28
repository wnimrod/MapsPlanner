import { injectMessageIds } from "src/utils/utils";

const scope = "components.AddTripModal";

export default injectMessageIds(scope, {
  name: "Create new Trip",
  submit: "Create",
  cancel: "Cancel",
  tooltips: {
    picture: "Trip Picture"
  },
  form: {
    picture: {
      source: {
        label: "Image Source",
        file: "File",
        url: "URL"
      }
    }
  }
}) as any;
