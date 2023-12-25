import { Container, Divider, Typography } from "@mui/material";
import GoogleLoginButton from "src/components/GoogleLoginButton";
import useCurrentUser from "src/hooks/useCurrentUser";
import { ERoute } from "src/routes";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import style from "./LoginPage.module.scss";

export default function LoginPage() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate(ERoute.Home);
    }
  }, [user?.isLoggedIn]);

  return (
    <div className={style.container}>
      <div className={style.header} />
      <Container maxWidth="sm">
        <div className={style["login-container"]}>
          <Typography variant="h5">Please log-in or sign-up</Typography>
          <Divider />
          <GoogleLoginButton />
        </div>
      </Container>
    </div>
  );
}
