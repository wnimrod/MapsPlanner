import { useState } from "react";

import { MenuProps, PopoverPosition } from "@mui/material";

export type TContextMenuForwardProps = Pick<
  MenuProps,
  "open" | "onClose" | "anchorReference" | "anchorPosition" | "anchorEl"
>;

type TOptions<CallbackArg> = {
  // Is context menu attached to anchor element, or mouse position?
  anchor?: HTMLElement;
  // Triggered when menu item selected.
  handleActionTaken?: (action?: CallbackArg) => void;
};

export default function useContextMenu<CallbackArg>({
  anchor,
  handleActionTaken
}: TOptions<CallbackArg> = {}) {
  const [contextMenuPosition, setContextMenuPosition] = useState<
    PopoverPosition | Element | undefined
  >(undefined);

  const handleContextMenuOpened = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (contextMenuPosition) {
      setContextMenuPosition(undefined); // Close menu.
    } else if (anchor) {
      setContextMenuPosition(anchor);
    } else {
      // Set mouse position
      setContextMenuPosition({ top: event.clientY - 6, left: event.clientX + 2 });
    }
  };

  const handleContextMenuClosed = (action?: CallbackArg) => {
    setContextMenuPosition(undefined);

    if (handleActionTaken) {
      handleActionTaken(action);
    }
  };

  const menuProps: TContextMenuForwardProps = {
    open: !!contextMenuPosition,
    onClose: () => handleContextMenuClosed(),
    anchorReference: anchor ? "anchorEl" : "anchorPosition",
    anchorPosition: contextMenuPosition as undefined | PopoverPosition,
    anchorEl: contextMenuPosition as undefined | Element
  };

  return {
    handleContextMenuOpened,
    handleContextMenuClosed,
    menuProps
  };
}
