import { login } from "../../services/AuthService";
import { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async () => {
    const success = await login({ email, password });

    setMessage(success ? "Du är inloggad" : "Felaktig inloggning");
  };

  return (
    <div className="login-form-container">
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

      <button className="form-input-button" onClick={handleLogin}>
        Sign in
      </button>

      <p>{message}</p>
    </div>
  );
};

export default LoginForm;
