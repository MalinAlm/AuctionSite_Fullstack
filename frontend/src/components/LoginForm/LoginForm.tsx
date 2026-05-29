import { login as loginUser } from "../../services/AuthService";
import { useState } from "react";
import "./LoginForm.css";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");

  const { login } = useAuth();

  const handleLogin = async () => {
    const token = await loginUser({ email, password });

    if (token) {
      login(token);
      setMessage("You are logged in");
    } else {
      setMessage("Invalid login");
    }
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
