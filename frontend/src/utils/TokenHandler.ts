export const baseUrl = import.meta.env.VITE_API_URL;

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token: string = String(localStorage.getItem("token"));

  return token;
};
