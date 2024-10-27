import React from 'react'
import { ForgotPasswordInputs } from '../../Utils/Helpers/Types';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import useForgotPassword from './useForgotPassword';
import { FormField } from '../../UI/FormField';
import { Label } from '../../UI/Label';
import { Input } from '../../UI/Input';
import { SubmitButton } from '../../UI/SubmitButton';

type Props = {}

const ForgotPasswordForm = (props: Props) => {
    const { register, formState: { errors }, handleSubmit, setError, clearErrors, reset } = useForm<ForgotPasswordInputs>();
    const {sendForgotPasswordRequest, isLoading} = useForgotPassword();
    const submitHandler = (formValues: ForgotPasswordInputs)=> {
        sendForgotPasswordRequest(formValues);
    }
  return (
    <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <FormField>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" {...register("email")} />
                </FormField>
                <SubmitButton type="submit">Send reset link</SubmitButton>
            </form>
        </div>
  )
}

export default ForgotPasswordForm