import { Google as GoogleIcon } from "@mui/icons-material";
import { Button, ButtonOwnProps } from "@mui/material";
import { useGoogleAuth } from "src/api/auth";

type TGoogleLoginButtonProps = Partial<ButtonOwnProps>;

export default function GoogleLoginButton({ ...buttonProps }: TGoogleLoginButtonProps) {
  const { redirect } = useGoogleAuth();

  return (
    <Button
      startIcon={<GoogleIcon />}
      variant="contained"
      color="inherit"
      {...buttonProps}
      onClick={redirect}
    >
      Login With Google
    </Button>
  );
}
