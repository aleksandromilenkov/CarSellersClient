import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUpdateProfile from './useUpdateProfile';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../Authentication/userSlice';

type Props = {};

interface ProfileFormInputs {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}

const UpdateProfileForm: React.FC<Props> = (props: Props) => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<ProfileFormInputs>();
  const { updateUser, isLoading } = useUpdateProfile();
  const dispatch = useDispatch();

  const submitHandler: SubmitHandler<ProfileFormInputs> = async (formValues) => {
    const { username, email, currentPassword, newPassword } = formValues;
    try {
      const updatedUser = await updateUser({ username, email, currentPassword, newPassword });
      reset();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="formField">
          <label htmlFor="username">New Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="email">New Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            placeholder="Current Password"
            {...register("currentPassword")}
          />
          {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="New Password"
            {...register("newPassword")}
          />
          {errors.newPassword && <p>{errors.newPassword.message}</p>}
        </div>
        <button type="submit">Update User Info</button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;