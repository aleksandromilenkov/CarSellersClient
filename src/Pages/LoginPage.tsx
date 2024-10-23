import React from "react";
import LoginForm from "../Components/Authentication/LoginForm";
import { LoginContainer } from "../UI/LoginContainer";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <LoginContainer>
       <h2>Log In The Car World</h2>
      <LoginForm />
    </LoginContainer>
  );
};

export default LoginPage;
