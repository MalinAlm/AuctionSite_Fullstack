export const baseUrl = import.meta.env.VITE_API_URL;

export const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  const token: string = String(localStorage.getItem("accessToken"));

  return token;
};
