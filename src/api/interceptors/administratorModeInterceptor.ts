import { InternalAxiosRequestConfig } from "axios";

type TState = {
  isAdministratorMode: boolean | undefined;
};

const state: TState = {
  isAdministratorMode: undefined
};

export const toggleAdministratorMode = (administratorMode: boolean) => {
  state.isAdministratorMode = administratorMode || undefined;
};

export default function AdministratorModeInterceptor(
  config: InternalAxiosRequestConfig
): typeof config {
  return {
    ...config,
    params: {
      // admin: Requests from the backend to returns all results, not just user-associated ones.
      impersonateUserId: state.isAdministratorMode ? "all" : undefined,
      ...config.params
    }
  };
}
