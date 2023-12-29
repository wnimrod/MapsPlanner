import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme
} from "@mui/material";
import { delay } from "src/utils/utils";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import style from "./ActionConfirmDialog.module.scss";
import messages from "./messages";

export type TDialogLanguage = Record<"header" | "body" | "confirm" | "cancel", MessageDescriptor>;
type TDialogLanguageValues = Record<string, any>;

type TDialogResolveCallback = (confirmed: boolean) => void;

type TProps = {
  dialogRef: React.MutableRefObject<any>;
  language?: Partial<TDialogLanguage>;
  languageValues?: Partial<TDialogLanguageValues>;
};

export type TActionConfirmDialogRef = {
  confirm: (
    languageOverride?: Partial<TDialogLanguage>,
    overrideLanguageValues?: Partial<TDialogLanguageValues>
  ) => Promise<boolean>;
};

export default function ActionConfirmDialog({
  dialogRef,
  language: languageDefaults = {},
  languageValues: defaultLanguageValues = {}
}: TProps) {
  const [isOpen, setIsOpen] = useState(false);

  const resolveRef = useRef<TDialogResolveCallback | null>(null);
  const theme = useTheme();

  const initialLanguageConfig = useMemo(
    () => ({
      language: {
        header: languageDefaults.header || messages.header,
        body: languageDefaults.body || messages.body,
        confirm: languageDefaults.confirm || messages.confirm,
        cancel: languageDefaults.header || messages.cancel
      },
      values: defaultLanguageValues
    }),
    []
  );

  const [{ language, values }, setLanguageConfig] = useState(initialLanguageConfig);

  const handleConfirm = async (
    languageOverride: Partial<TDialogLanguage> = {},
    overrideLanguageValues: Partial<TDialogLanguageValues> = {}
  ) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve as TDialogResolveCallback;
      setLanguageConfig({
        language: { ...language, ...languageOverride },
        values: { ...values, ...overrideLanguageValues }
      });
      setIsOpen(true);
    });
  };

  const handleClose = async (confirmed: boolean) => {
    setIsOpen(false);
    resolveRef?.current?.(confirmed);
    // Wait to dialog to close, before reseting the text.
    await delay(theme.transitions.duration.leavingScreen);
    setLanguageConfig(initialLanguageConfig);
  };

  useEffect(() => {
    if (dialogRef) {
      dialogRef.current = { confirm: handleConfirm };
    }
  }, [dialogRef]);

  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={() => handleClose(false)}
      classes={{ root: style.dialog }}
    >
      <DialogTitle>
        <FormattedMessage {...language.header} values={values} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage {...language.body} values={values} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>
          <FormattedMessage {...language.cancel} values={values} />
        </Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          <FormattedMessage {...language.confirm} values={values} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
