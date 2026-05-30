import { getToken, baseUrl } from "../utils/TokenHandler";
import type { CreateAuctionRequest, Auction } from "../types/Types";

export const createAuction = async (request: CreateAuctionRequest) => {
  const response = await fetch(`${baseUrl}/auction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(request),
  });

  return response.ok;
};

export const getAuctions = async (): Promise<Auction[]> => {
  const response = await fetch(`${baseUrl}/auction`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  });

  return await response.json();
};

export const getAuctionById = async (auctionId: string): Promise<Auction> => {
  const response = await fetch(`${baseUrl}/auction/${auctionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Barer" + getToken(),
    },
  });

  return await response.json();
};
