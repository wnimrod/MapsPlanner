import { MenuProps } from "@mui/material";

import { useState } from "react";

type MousePosition = {
  x: number;
  y: number;
};

export type TContextMenuForwardProps = Pick<
  MenuProps,
  "open" | "onClose" | "anchorReference" | "anchorPosition"
>;

export default function useContextMenu<CallbackArg>(
  handleActionTaken?: (action?: CallbackArg) => void
) {
  const [contextMenuPosition, setContextMenuPosition] = useState<MousePosition | null>(null);

  const handleContextMenuOpened = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenuPosition(
      contextMenuPosition === null ? { x: event.clientX + 2, y: event.clientY - 6 } : null
    );
  };

  const handleContextMenuClosed = (action?: CallbackArg) => {
    if (handleActionTaken) {
      handleActionTaken(action);
    }
    setContextMenuPosition(null);
  };

  const menuProps: TContextMenuForwardProps = {
    open: contextMenuPosition !== null,
    onClose: () => handleContextMenuClosed(),
    anchorReference: "anchorPosition",
    anchorPosition:
      contextMenuPosition !== null
        ? { top: contextMenuPosition.y, left: contextMenuPosition.x }
        : undefined
  };

  return {
    handleContextMenuOpened,
    handleContextMenuClosed,
    menuProps
  };
}
