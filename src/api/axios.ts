import axios, { AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";

export type TAxiosMiddlewareApplication = {
  middleware: (instance: AxiosInstance, options?: any) => AxiosInstance;
  options?: any;
};

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
