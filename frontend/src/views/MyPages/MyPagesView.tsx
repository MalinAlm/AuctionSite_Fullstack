import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./MyPagesView.css";
import { changePassword } from "../../services/AuthService";

const MyPagesView = () => {
  const { userName } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setMessage("Please fill in both password fields");
      return;
    }

    const success = await changePassword({ currentPassword, newPassword });

    if (success) {
      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password changed successfully");
      return;
    }
    setMessage("Could not change password. Check your current password");
  };

  return (
    <div className="my-pages-container">
      <h1>My pages</h1>

      <p>Logged in as: {userName}</p>

      <section className="change-password-section">
        <h2>Change password</h2>

        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />

        <button onClick={handleChangePassword}>Change password</button>

        {message && <p>{message}</p>}
      </section>
    </div>
  );
};

export default MyPagesView;
