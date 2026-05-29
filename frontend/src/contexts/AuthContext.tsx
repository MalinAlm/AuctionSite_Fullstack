import { createContext, useContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getRoleFromToken = (token: string | null) => {
  if (!token) return null;

  //atob converts Base64 to regular text
  const payload = JSON.parse(atob(token.split(".")[1]));

  //returns the role
  return payload[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const role = getRoleFromToken(token);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: !!token,
        isAdmin: role === "Admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return context;
};
