export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}

export interface Bid {
  id: string;
  amount: number;
  createdAt: string;
  userId: string;
  userName: string;
}
export interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  startsAt: string;
  endsAt: string;
  isOpen: boolean;
  isActive: boolean;
  userId: string;
  userName: string;
  bids: Bid[];
}

export interface CreateAuctionRequest {
  title: string;
  description: string;
  startingPrice: number;
  startsAt: string;
  endsAt: string;
}

export interface CreateBidRequest {
  amount: number;
}

export interface BidActionResponse {
  success: boolean;
  message: string;
  bid: Bid | null;
}
export interface JwtResponse {
  token: string;
}

export type AuthContextType = {
  token: string | null;
  userId: string | null;
  userName: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AdminUser {
  id: string;
  userName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface AdminAuction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  startsAt: string;
  endsAt: string;
  isOpen: boolean;
  isActive: boolean;
  userId: string;
  userName: string;
  bidCount: number;
  highestBid: number | null;
}
