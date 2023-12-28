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
