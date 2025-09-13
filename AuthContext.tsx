// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../supabaseClient";
import { Roles, Role } from "../roles";

interface User {
  id: string;
  email: string;
  role: Role | "unknown";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1️⃣ Check initial session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchUserRole(session.user.id);
        } else {
          setLoading(false);
        }

        // 2️⃣ Listen for auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            if (session?.user) {
              await fetchUserRole(session.user.id);
            } else {
              setUser(null);
            }
          }
        );

        return () => {
          listener.subscription.unsubscribe();
        };
      } catch (err) {
        console.error("Auth init error:", err);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Fetch role from profiles table or fallback to metadata
  const fetchUserRole = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role, email")
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        // fallback to metadata
        const { data: metaData } = await supabase.auth.getUser();
        const role: Role | "unknown" =
          (metaData.user?.user_metadata?.role as Role) || "unknown";
        setUser({
          id,
          email: metaData.user?.email || "",
          role,
        });
      } else {
        const role: Role | "unknown" =
          (data.role as Role) in Roles ? (data.role as Role) : "unknown";
        setUser({
          id,
          email: data.email,
          role,
        });
      }
    } catch (err) {
      console.error("Failed fetching user role:", err);
      setUser({
        id,
        email: "",
        role: "unknown",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
