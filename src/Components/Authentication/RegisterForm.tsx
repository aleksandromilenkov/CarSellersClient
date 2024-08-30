import React from 'react'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "./useLogin";
import useRegister from './useRegister';
import { Link } from 'react-router-dom';

type Props = {};
type RegisterFormInputs = {
  username: string;
  password: string;
  email:string;
};

const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string().required("Email is required"),
  });
const RegisterForm = (props: Props) => {
    const { registerUser, isLoading } = useRegister();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormInputs>({ resolver: yupResolver(validation) });
    const handleRegister = (form: RegisterFormInputs) => {
      const userName = form.username;
      const password = form.password;
      const email = form.email;
      console.log(userName, password, email);
      registerUser({ userName, email, password });
    };
  return (
    <form onSubmit={handleSubmit(handleRegister)}>
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
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Email
      </label>
      <input
        type="text"
        id="email"
        placeholder="Email"
        {...register("email")}
      />
      {errors?.email ? (
        <p className="text-white">{errors.email.message}</p>
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
    <button type="submit">Sign up</button>
    <p>
      Don’t have an account yet? <Link to="/login">Login here</Link>
    </p>
  </form>
  )
}

export default RegisterForm