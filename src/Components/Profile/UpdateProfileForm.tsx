import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUpdateProfile from './useUpdateProfile';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../Authentication/userSlice';
import { FormField } from '../../UI/FormField';
import { Label } from '../../UI/Label';
import { Input } from '../../UI/Input';
import { ErrorMessage } from '../../UI/ErrorMessage';
import { SubmitButton } from '../../UI/SubmitButton';

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
      <FormField>
        <Label htmlFor="username">New Username</Label>
        <Input type="text" id="username" placeholder="Username" {...register("username")} />
        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
      </FormField>
      <FormField>
        <Label htmlFor="email">New Email</Label>
        <Input type="email" id="email" placeholder="Email" {...register("email")} />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormField>
      <FormField>
        <Label htmlFor="profileImage">New Profile Picture</Label>
        <Input type="file" id="profileImage" accept="image/jpeg,image/png,image/jpg" {...register("profileImage")} />
        {errors.profileImage && <ErrorMessage>{errors.profileImage.message}</ErrorMessage>}
      </FormField>
      <FormField>
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input type="password" id="currentPassword" placeholder="Current Password" {...register("currentPassword")} />
        {errors.currentPassword && <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>}
      </FormField>
      <FormField>
        <Label htmlFor="newPassword">New Password</Label>
        <Input type="password" id="newPassword" placeholder="New Password" {...register("newPassword")} />
        {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}
      </FormField>
      <SubmitButton type="submit">Update User Info</SubmitButton>
    </form>
  </div>
  );
};

export default UpdateProfileForm;
