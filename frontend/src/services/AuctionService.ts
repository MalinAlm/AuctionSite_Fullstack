import { getToken, baseUrl } from "../utils/TokenHandler";
import type { CreateAuctionRequest, Auction } from "../types/Types";

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
      Authorization: "Bearer " + getToken(),
    },
  });

  return await response.json();
};

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

export const updateAuction = async (
  auctionId: string,
  request: CreateAuctionRequest,
): Promise<boolean> => {
  const response = await fetch(`${baseUrl}/auction/${auctionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(request),
  });

  return response.ok;
};

export const getClosedAuctions = async (): Promise<Auction[]> => {
  const response = await fetch(`${baseUrl}/auction?showClosedAuctions=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not load closed auctions");
  }

  return await response.json();
};

export const searchAuctions = async (title: string): Promise<Auction[]> => {
  const response = await fetch(
    `${baseUrl}/auction/search?title=${encodeURIComponent(title)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Could not search auctions");
  }

  return await response.json();
};

export const searchClosedAuctions = async (
  title: string,
): Promise<Auction[]> => {
  const response = await fetch(
    `${baseUrl}/auction/search?title=${encodeURIComponent(title)}&showClosedAuctions=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Could not search closed auctions");
  }

  return await response.json();
};
