import React, { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import Cookie from "js-cookie";

import { api } from "../../services/api";

import type { 
  AuthProviderProps, 
  ISignInResponse, 
  IUserProps, 
  signInCredentials,
} from "./types";

interface AuthContextData {
  signIn: (credentials: signInCredentials) => Promise<void>;
  signOut: () => void;
  user: IUserProps | undefined;
}

export const AuthContext = createContext({} as AuthContextData); 

export function AuthProvider({ children }: AuthProviderProps) {
  const history = useHistory();

  const [user, setUser] = useState<IUserProps | undefined>(() => {
    const userCookie = Cookie.get("whats-front-user");

    if(userCookie) return JSON.parse(userCookie);
    return undefined;
  });

  useEffect(() => {
    const token = Cookie.get('whats-front-token');
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
    }
  }, []);

  async function signIn({ email, password }) {
    try {
      const { data: { token, user } } = await api.post<ISignInResponse>('/auth/login', {
        email,
        password,
      });

      api.defaults.headers.common.authorization = `Bearer ${token.accessToken}`;

      Cookie.set('whats-front-token', token.accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
      });

      Cookie.set('whats-front-user', JSON.stringify(user), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
      });

      setUser(user);
      toast.success(`Seja bem vindo, ${user.firstName}!`)

      history.push('/admin/contacts');
    } catch (err: any) {
      if(err.response.data.message.message === "error.userNotFound") {
        toast.error("Usuário não encontrado");
      } 

      if(err.response.data.message.message === "error.passwordInvalid") {
        toast.error("Senha incorreta");
      } 
    };
  }

  function signOut() {
    Cookie.remove("whats-front-token");
    history.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
      
      {children}
    </AuthContext.Provider>
  );
}
