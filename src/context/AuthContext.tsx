import { createContext, useContext, ReactNode } from "react";

export type AuthContextType = {
  user: { email: string } | null;
  loading: boolean;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // placeholder logic, adjust with your real auth
  const user = { email: "test@example.com" };
  const loading = false;
  const signOut = () => {};

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
