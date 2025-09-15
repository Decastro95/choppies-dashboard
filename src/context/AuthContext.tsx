import { createContext, useContext } from "react";

export type AuthContextType = {
  user: { email: string } | null;
  loading: boolean;
};

export export export export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
});

export function useAuth() {
  return useContext(AuthContext);
}
