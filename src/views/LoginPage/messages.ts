import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "views.LoginPage";

export default injectMessageIds(scope, {
  header: "Welcome Back!",
  subtitle: "Please login in or register."
}) as any;
