import axios, { AxiosInstance, AxiosResponse } from "axios";
import applyCaseMiddleware from "axios-case-converter";

type TMiddlewareOptions = object;

export type TAxiosMiddlewareApplication = {
  middleware: (instance: AxiosInstance, options?: TMiddlewareOptions) => AxiosInstance;
  options?: TMiddlewareOptions;
};

export function unwrapAxiosResult<TResponse, TData>(result: AxiosResponse<TResponse, TData>) {
  /**
   * Unwraps axios response and returns the data inself only.
   * @param result: Original axios response object.
   */
  return result.data;
}

const middlewares: TAxiosMiddlewareApplication[] = [
  {
    middleware: applyCaseMiddleware
  }
];

const baseInstance = axios.create({
  baseURL: `${import.meta.env.API_BASE_URL}/api`,
  timeout: 30000,
  withCredentials: true
});

const instance = middlewares.reduce(
  (instance: AxiosInstance, { middleware: applyMiddleware, options }) =>
    applyMiddleware(instance, options),
  baseInstance
);

export default instance;
