export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
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
  bids: [];
}

export interface JwtResponse {
  token: string;
}

// export interface Message {
//   message: string;
// }
