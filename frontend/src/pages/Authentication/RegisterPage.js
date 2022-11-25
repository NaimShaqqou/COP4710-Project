import React from 'react'
import AuthBox from '../../components/Authentication/AuthBox'
import RegisterForm from '../../components/Authentication/RegisterForm'

function RegisterPage() {
  return (
    <AuthBox 
        header="Sign Up"
        subtitle="Sign up using Email"
        form={<RegisterForm />}
    />
  )
}

export default RegisterPage