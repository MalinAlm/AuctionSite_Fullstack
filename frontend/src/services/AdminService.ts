import type { AdminAuction, AdminUser } from "../types/Types";
import { baseUrl, getToken } from "../utils/TokenHandler";

const getAdminHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + getToken(),
});

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch(`${baseUrl}/Admin/users?showInactive=true`, {
    method: "GET",
    headers: getAdminHeaders(),
  });

  if (!response.ok) {
    throw new Error("Could not load users.");
  }

  return await response.json();
};

export const getAdminAuctions = async (): Promise<AdminAuction[]> => {
  const response = await fetch(`${baseUrl}/Admin/auctions?showInactive=true`, {
    method: "GET",
    headers: getAdminHeaders(),
  });

  if (!response.ok) {
    throw new Error("Could not load auctions.");
  }

  return await response.json();
};

export const setUserActiveStatus = async (
  userId: string,
  isActive: boolean,
): Promise<boolean> => {
  const endpoint = isActive ? "activate" : "deactivate";

  const response = await fetch(`${baseUrl}/Admin/users/${userId}/${endpoint}`, {
    method: "PUT",
    headers: getAdminHeaders(),
  });

  return response.ok;
};

export const setAuctionActiveStatus = async (
  auctionId: string,
  isActive: boolean,
): Promise<boolean> => {
  const endpoint = isActive ? "activate" : "deactivate";

  const response = await fetch(
    `${baseUrl}/Admin/auctions/${auctionId}/${endpoint}`,
    {
      method: "PUT",
      headers: getAdminHeaders(),
    },
  );

  return response.ok;
};
