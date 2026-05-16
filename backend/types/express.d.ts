declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email?: string;
      username?: string;
      role?: string;
      phone?: string;
      address?: string;
    };
  }
}
