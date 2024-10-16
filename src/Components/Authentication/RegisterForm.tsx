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
  profileImage?: File | null;
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
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormInputs>({ resolver: yupResolver(validation) });
    const handleRegister = (formValues: RegisterFormInputs) => {
      const formData = new FormData();
      formData.append("username", formValues.username.toString());
      formData.append("email", formValues.email.toString());
      formData.append("password", formValues.password.toString());
      if (formValues.profileImage instanceof FileList && formValues.profileImage.length > 0) {
        const profileImageFile = formValues.profileImage[0]; // Get the first file from the FileList
        formData.append("profileImage", profileImageFile); // Append the file
      }
      registerUser(formData);
      reset()
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
        type="email"
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
      <label
        htmlFor="profileImage"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Profile Image
      </label>
      <input
        type="file"
        id="profileImage"
        placeholder="profileImage"
        accept="image/jpeg,image/png,image/jpg"
        {...register("profileImage")}
      />
      {errors?.profileImage ? (
        <p className="text-white">{errors.profileImage.message}</p>
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