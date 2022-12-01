import React from "react";
import AuthBox from "../../components/Authentication/AuthBox";
import LoginForm from "../../components/Authentication/LoginForm"

function LoginPage() {
  return (
    <AuthBox
      header="Sign In"
      subtitle="Enter your credentials to continue"
      form={<LoginForm />}
    />
  );
}

export default LoginPage;
