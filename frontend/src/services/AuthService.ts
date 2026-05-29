import type {
  RegisterRequest,
  LoginRequest,
  JwtResponse,
} from "../types/Types";
import { baseUrl } from "../utils/TokenHandler";

export const login = async (request: LoginRequest) => {
  const response = await fetch(`${baseUrl}/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(request),
  });

  if (!response.ok) {
    return null;
  }

  const jwt: JwtResponse = await response.json();
  return jwt.token;
};

export const register = async (request: RegisterRequest) => {
  const response = await fetch(`${baseUrl}/Auth/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(request),
  });

  return response.ok;
};
