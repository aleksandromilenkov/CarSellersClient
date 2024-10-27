import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormField } from "../../UI/FormField";
import { Label } from "../../UI/Label";
import { Input } from "../../UI/Input";
import { ErrorMessage } from "../../UI/ErrorMessage";
import { SubmitButton } from "../../UI/SubmitButton";
import { FormWrapper } from "../../UI/FormWrapper";
import { ForgotPasswordLink } from "../../UI/ForgotPasswordLink";
import { RegisterLink } from "../../UI/RegisterLink";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import ForgotPasswordForm from "./ForgotPasswordForm";

type Props = {};

type LoginFormsInputs = {
  username: string;
  password: string;
};

const validation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = (props: Props) => {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
  const handleLogin = (form: LoginFormsInputs) => {
    const userName = form.username;
    const password = form.password;
    console.log(userName, password);
    login({ userName, password });
    reset()
  };
  return (
    <FormWrapper>
    <form onSubmit={handleSubmit(handleLogin)}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" placeholder="Username" {...register("username")} />
        {errors?.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="••••••••" {...register("password")} />
        {errors?.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </FormField>
      <Modal>
        <Modal.Open opens="forgot-password">
          <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
        </Modal.Open>
        <Modal.Window name="forgot-password">
        <ForgotPasswordForm/>
        </Modal.Window>
      </Modal>
      <SubmitButton type="submit">Sign in</SubmitButton>
      <RegisterLink>
        Don’t have an account yet? <Link to="/register">Register here</Link>
      </RegisterLink>
    </form>
  </FormWrapper>
  );
};

export default LoginForm;
