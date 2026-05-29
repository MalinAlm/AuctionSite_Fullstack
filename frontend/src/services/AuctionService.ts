import { getToken, baseUrl } from "../utils/TokenHandler";

export const getAuctions = async () => {
  const response = await fetch(`${baseUrl}/auction`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  });

  return await response.json();
};
