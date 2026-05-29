import { useState } from "react";
import LoginForm from "../../../components/LoginForm/LoginForm";
import "./LoginView.css";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";

const LoginView = () => {
  const [showLogin, setShowlogin] = useState(true);

  return (
    <div className="login-view">
      <h1>{showLogin ? "Sign in" : "Sign up"}</h1>
      {showLogin ? <LoginForm /> : <RegisterForm />}

      <button
        className="login-register-toggle-button"
        onClick={() => setShowlogin(!showLogin)}
      >
        {showLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Sign in"}
      </button>
    </div>
  );
};

export default LoginView;
