
export interface Follower {
  id: number;
  createdAt: string;
  follower: string;
  followDate: string;
}

export interface Sub {
  id: number;
  createdAt: string;
  sub: string;
  subDateOrig: string;
  subDateRenew: string;
  streak: number;
  totMonths: number;
}

export interface Bit {
  id: number;
  createdAt: string;
  user: string;
  cheerDate: string;
  bitCount: number;
}
