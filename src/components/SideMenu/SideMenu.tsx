import { Drawer } from "@mui/material";
import { setIsSideMenuOpen } from "src/store/global";
import { AppDispatch } from "src/store/store";
import { TRootState } from "src/store/types";

import { useDispatch, useSelector } from "react-redux";

export default function SideMenu() {
  const isSideMenuOpen = useSelector((state: TRootState) => state.global.isSideMenuOpen);
  const dispatch: AppDispatch = useDispatch();

  return (
    <Drawer
      anchor="left"
      open={isSideMenuOpen}
      onClose={() => dispatch(setIsSideMenuOpen(false))}
      hideBackdrop
    >
      x
    </Drawer>
  );
}
