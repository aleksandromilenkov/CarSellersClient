// ResetPassword.tsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import useResetPassword from './useResetPassword';
import { ResetPasswordInputs } from '../../Utils/Helpers/Types';
import { useForm } from 'react-hook-form';
import { FormField } from '../../UI/FormField';
import { Label } from '../../UI/Label';
import { Input } from '../../UI/Input';
import { SubmitButton } from '../../UI/SubmitButton';

const ResetPassword: React.FC = () => {
    const { register, formState: { errors }, handleSubmit, setError, clearErrors, reset } = useForm<ResetPasswordInputs>();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || '';
    const token = searchParams.get('token') || '';
    const [message, setMessage] = useState('');
    const {resetPassword, isLoading} = useResetPassword();
    const submitHandler = (formValues: ResetPasswordInputs)=> {
        const password = formValues.password;
        try {
            resetPassword( {
             email,
             token,
             password
         })
         } catch (error) {
             setMessage('Error: Could not reset password.');
         }
    }
    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <FormField>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" {...register("password")} />
                </FormField>
                <SubmitButton type="submit">Reset Password</SubmitButton>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;

