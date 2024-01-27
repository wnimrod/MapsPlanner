import { writeFileSync } from "fs";
import { glob } from "glob";

const messagesSearchPattern = `${process.cwd()}/src/**/messages.ts`;
const dumpFileLocation = `${process.cwd()}/src/lang/en.json`;

// Parse Args
const args = process.argv.slice(2);
const parsedArgs = {
  quite: false
};

for (const i in args) {
  const arg = args[i];
  switch (arg) {
    case "-q":
    case "--quiet":
      parsedArgs.quite = true;
      break;
  }
}

const log = (...args: any[]) => {
  if (!parsedArgs.quite) {
    console.log(...args);
  }
};

const handleMessagesFile = async (path: string) => {
  try {
    log("Proccessing file: ", path);
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
  log("Preparing messages ...");
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

  log("Writing file ...");
  writeFileSync(dumpFileLocation, JSON.stringify(unitedMessages, null, 2));
  log("Done. Written file: ", dumpFileLocation);
});
