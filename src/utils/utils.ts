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

export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}

export function enumKeys(_enum: any) {
  /**
   * Extracts the keys of an unmapped enum.
   * @param _enum An unmapped enum.
   */

  const keys = Object.keys(_enum);
  const extractedKeys = Object.keys(_enum).filter((key) => Number.isNaN(+key));
  if (keys.length / extractedKeys.length != 2) {
    throw new Error("Invalid enum input; is it unmapped enum?");
  } else {
    return extractedKeys;
  }
}

export function isFunctionalComponent(Component: React.FC | any) {
  return (
    typeof Component === "function" && // can be various things
    !(
      (
        Component.prototype && // native arrows don't have prototypes
        Component.prototype.isReactComponent
      ) // special property
    )
  );
}
