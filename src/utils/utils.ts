import { MessageDescriptor } from "react-intl";

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

export const injectMessageIds = (
  scope: string,
  messages: MessageDescriptor | Record<string, MessageDescriptor>
): Record<string, any> =>
  Object.entries(messages)
    .filter(([, messageBody]) => messageBody !== null)
    .reduce((messagesWithId, [nextMessageKey, nextMessageBody]) => {
      if (typeof nextMessageBody === "string") {
        // eslint-disable-next-line no-param-reassign
        nextMessageBody = {
          defaultMessage: nextMessageBody
        };
      }

      const isLeaf = typeof nextMessageBody.defaultMessage === "string";
      const currentScope = `${scope}.${nextMessageKey}`;

      return {
        ...messagesWithId,
        [nextMessageKey]: isLeaf
          ? {
              id: currentScope,
              ...nextMessageBody
            } // If id presented, do not override.
          : injectMessageIds(currentScope, nextMessageBody)
      };
    }, {});
