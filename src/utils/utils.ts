import { TConditionalWrapProps } from "./types";

export const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

export function generateEntityMocks<T>(length: number) {
  return Array.from({ length }).map((_, idx) => ({ id: idx }) as unknown as T);
}

export function ConditionalWrap({ children, condition, wrapper }: TConditionalWrapProps) {
  if (condition) {
    return wrapper(children);
  } else {
    return children;
  }
}
