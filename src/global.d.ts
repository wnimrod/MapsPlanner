export {};

declare type TActionConfirmDialogRef =
  import("./components/ActionConfirmDialog/ActionConfirmDialog").TActionConfirmDialogRef;
declare type TDialogLanguage =
  import("./components/ActionConfirmDialog/ActionConfirmDialog").TDialogLanguage;

declare global {
  declare interface Window {
    confirmDialog: (
      languageOverride?: Partial<TDialogLanguage>,
      languageValues?: Record<string, any>
    ) => Promise<boolean>;
  }
}
