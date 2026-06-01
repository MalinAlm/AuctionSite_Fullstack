import type { BidActionResponse, CreateBidRequest } from "../types/Types";
import { baseUrl, getToken } from "../utils/TokenHandler";

export const createBid = async (
  auctionId: string,
  request: CreateBidRequest,
): Promise<BidActionResponse> => {
  const response = await fetch(`${baseUrl}/bid/auction/${auctionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorMessage = await response.text();

    return {
      success: false,
      message: errorMessage + " kr",
      bid: null,
    };
  }

  return await response.json();
};

export const deleteLatestBid = async (
  auctionId: string,
): Promise<BidActionResponse> => {
  const response = await fetch(`${baseUrl}/bid/auction/${auctionId}/latest`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Could not delete bid.",
      bid: null,
    };
  }

  return await response.json();
};
