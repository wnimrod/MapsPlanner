import { writeFileSync } from "fs";
import { glob } from "glob";

const messagesSearchPattern = `${process.cwd()}/src/**/messages.ts`;
const dumpFileLocation = `${process.cwd()}/src/lang/en.json`;

const handleMessagesFile = async (path: string) => {
  try {
    console.log("Proccessing file: ", path);
    const { default: messages } = await import(path);
    return extractMessages(messages);
  } catch (err) {
    console.error("Failed to parse file: ", path, err);
  }
};

const extractMessages = (messages: object) => {
  const flatMessages: object = {};

  for (const key in messages) {
    const message = messages[key];
    if ("id" in message && "defaultMessage" in message) {
      flatMessages[message.id] = message.defaultMessage;
    } else {
      Object.assign(flatMessages, extractMessages(message));
    }
  }

  return flatMessages;
};

glob(messagesSearchPattern, {}).then(async (paths) => {
  console.log("Preparing messages ...");
  const flatMessagesParts = await Promise.all(
    paths.sort((a, b) => a.localeCompare(b)).map(handleMessagesFile)
  );

  const unitedMessages = flatMessagesParts.reduce(
    (flatMessagesAccumulator, nextFlatMessages) => ({
      ...flatMessagesAccumulator,
      ...nextFlatMessages
    }),
    {}
  );

  console.log("Writing file ...");
  writeFileSync(dumpFileLocation, JSON.stringify(unitedMessages, null, 2));
  console.log("Done. Written file: ", dumpFileLocation);
});
