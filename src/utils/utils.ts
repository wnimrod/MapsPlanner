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

type TMessagesStructure<TLeaf> = Record<string, string | Record<string, TLeaf>>;

export const injectMessageIds = (
  scope: string,
  messages: TMessagesStructure<string>
): TMessagesStructure<MessageDescriptor> =>
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
