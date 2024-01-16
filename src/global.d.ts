export {};

declare type TActionConfirmDialogRef =
  import("./ui/molecules/ActionConfirmDialog/ActionConfirmDialog").TActionConfirmDialogRef;
declare type TDialogLanguage =
  import("./ui/molecules/ActionConfirmDialog/ActionConfirmDialog").TDialogLanguage;

declare global {
  declare interface Window {
    confirmDialog: (
      languageOverride?: Partial<TDialogLanguage>,
      languageValues?: Record<string, any>
    ) => Promise<boolean>;
  }
}
