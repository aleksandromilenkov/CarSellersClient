import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUpdateProfile from './useUpdateProfile';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../Authentication/userSlice';

type Props = {};

interface ProfileFormInputs {
  username: string;
  email: string;
  profileImage: File | null;
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
      const formData = new FormData();
      if(formValues?.username) formData.append("username", formValues.username.toString());
      if(formValues?.email) formData.append("email", formValues.email.toString());
      if(formValues?.currentPassword && formValues?.newPassword) {
        formData.append("currentPassword", formValues.currentPassword.toString());
        formData.append("newPassword", formValues.newPassword.toString());
      }
      if (formValues.profileImage instanceof FileList && formValues.profileImage.length > 0) {
        const profileImageFile = formValues.profileImage[0]; // Get the first file from the FileList
        formData.append("profileImage", profileImageFile); // Append the file
      }
      const updatedUser = await updateUser(formData);
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
          <label htmlFor="profileImage">New Profile Picture</label>
          <input
            type="file"
            id="profileImage"
            placeholder="profileImage"
            {...register("profileImage")}
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
