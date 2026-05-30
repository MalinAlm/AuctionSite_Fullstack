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
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
};
