import { MessageDescriptor, defineMessages } from "react-intl";

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

export function injectMessageIds(scope: string, messages: any): Record<string, MessageDescriptor> {
  return defineMessages(
    Object.entries(messages)
      .filter(([, messageBody]) => messageBody !== null)
      .reduce((messagesWithId, [nextMessageKey, nextMessage]) => {
        const isLeaf = typeof nextMessage === "string";
        const currentScope = `${scope}.${nextMessageKey}`;

        return {
          ...messagesWithId,
          [nextMessageKey]: isLeaf
            ? { id: currentScope, defaultMessage: nextMessage }
            : injectMessageIds(currentScope, nextMessage)
        };
      }, {})
  );
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
