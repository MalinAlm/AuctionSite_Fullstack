import { createContext, useContext, useState } from "react";
import type { AuthContextType } from "../types/Types";

const getRoleFromToken = (token: string | null) => {
  try {
    if (!token) return null;

    //atob converts Base64 to regular text
    const payload = JSON.parse(atob(token.split(".")[1]));

    //returns the role
    return payload[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string | null) => {
  try {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000;

    return Date.now() >= expirationTime;
  } catch {
    return true;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedToken = localStorage.getItem("token");

  if (storedToken && isTokenExpired(storedToken)) {
    localStorage.removeItem("token");
  }

  const [token, setToken] = useState<string | null>(
    isTokenExpired(storedToken) ? null : storedToken,
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
