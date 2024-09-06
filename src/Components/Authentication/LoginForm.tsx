import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";

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
    <form onSubmit={handleSubmit(handleLogin)}>
      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          {...register("username")}
        />
        {errors?.username ? (
          <p className="text-white">{errors.username.message}</p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors?.password ? <p>{errors.password.message}</p> : ""}
      </div>
      <div>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit">Sign in</button>
      <p>
        Don’t have an account yet? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
};

export default LoginForm;
