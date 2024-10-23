import React from 'react'
import RegisterForm from '../Components/Authentication/RegisterForm'
import { LoginContainer } from '../UI/LoginContainer'

type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <LoginContainer>
      <h2>Register In The Car World</h2>
        <RegisterForm/>
    </LoginContainer>
  )
}

export default RegisterPage