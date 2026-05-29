import { useState } from "react";
import "../LoginForm/LoginForm.css";
import { register } from "../../services/AuthService";

const RegisterForm = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");

  const handleRegister = async () => {
    const success = await register({
      userName,
      email,
      password,
    });

    setMessage(success ? "Account created" : "Registration failed");
  };

  return (
    <div className="login-form-container">
      <input
        className="form-input-button"
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-input-button"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-input-button"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="form-input-button" onClick={handleRegister}>
        Register
      </button>

      <p>{message}</p>
    </div>
  );
};

export default RegisterForm;
