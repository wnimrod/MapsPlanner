import { useSnackbar } from "notistack";

import { copyToClipboard } from "src/utils/utils";

export default function useCopyToClipboard() {
  const { enqueueSnackbar } = useSnackbar();

  return async (text: string) => {
    try {
      copyToClipboard(text);
      enqueueSnackbar({
        message: "Text successfully copied to clipboard.",
        variant: "success"
      });
    } catch (error) {
      enqueueSnackbar({
        message: "Failed to copy text to clipboard.",
        variant: "error"
      });
    }
  };
}
