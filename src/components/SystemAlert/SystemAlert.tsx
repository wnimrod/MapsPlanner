import { Alert, Snackbar } from "@mui/material";
import { dismissAlert } from "src/store/global";
import { TRootState } from "src/store/types";

import { useDispatch, useSelector } from "react-redux";

export default function SystemAlert() {
  const { isOpen, message, severity } = useSelector((state: TRootState) => state.global.alert);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(dismissAlert());

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} TransitionProps={{ onExited: handleClose }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
