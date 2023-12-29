import { injectMessageIds } from "src/utils/utils";

const scope = "views.LoginPage";

export default injectMessageIds(scope, {
  header: "Welcome Back!",
  subtitle: "Please login in or register."
}) as any;
