import { MessageDescriptor, defineMessages } from "react-intl";

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
