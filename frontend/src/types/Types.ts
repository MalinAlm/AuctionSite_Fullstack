export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}

// export interface Auction {
//   title: string;
//   description: string;
//   startingPrice: number;
//   startsAt: Date;
//   endsAt: Date;
//   userId: string;
//   user: User;
// }

export interface JwtResponse {
  token: string;
}

// export interface Message {
//   message: string;
// }
