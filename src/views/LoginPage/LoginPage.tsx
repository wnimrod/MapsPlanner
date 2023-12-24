import { Container, Divider, Typography } from "@mui/material";
import GoogleLoginButton from "src/components/GoogleLoginButton";
import { TRootState } from "src/store/types";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import style from "./LoginPage.module.scss";

export default function LoginPage() {
  const user = useSelector((state: TRootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate("/");
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
