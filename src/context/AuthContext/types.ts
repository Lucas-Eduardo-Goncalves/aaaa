import { ReactNode } from "react";

export interface IUserProps {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  updatedAt: string;
}

export interface ITokenProps {
  accessToken: string;
  expiresIn: number;
}

export interface ISignInResponse {
  user: IUserProps;
  token: ITokenProps;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface signInCredentials {
  email: string;
  password: string;
}