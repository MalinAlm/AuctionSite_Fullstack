import { login } from "../../../services/AuthService";
import { useState } from "react";

const TestForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async () => {
    const success = await login({ email, password });

    setMessage(success ? "Du är inloggad" : "Felaktig inloggning");
  };

  return (
    <>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Logga in</button>

      <p>{message}</p>
    </>
  );
};

export default TestForm;
