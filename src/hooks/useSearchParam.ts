import useSearchParams from "./useSearchParams";

export { EGlobalSearchParams } from "./useSearchParams";

export default function useSearchParam<T = string>(param: string) {
  const { searchParams } = useSearchParams({ param });

  return searchParams.get(param) as T;
}
