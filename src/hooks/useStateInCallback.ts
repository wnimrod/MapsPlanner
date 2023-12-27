import { MutableRefObject, useRef } from "react";

import { useForceUpdate } from "./useForceUpdate";

export type UseStateInCallbackReturnType<Type> = [MutableRefObject<Type>, (value: Type) => void];

export function useStateInCallback<Type = unknown>(
  initialValue: Type
): UseStateInCallbackReturnType<Type> {
  /**
   * Using state and setState in callback is a little problematic.
   * Here's a custom hook to solve this issue, using ref and manual updater.
   */

  const value = useRef(initialValue);
  const forceUpdate = useForceUpdate();

  const setValue = (nextValue: Type) => {
    value.current = nextValue;
    forceUpdate();
  };

  return [value, setValue];
}
