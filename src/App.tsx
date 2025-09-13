import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../supabaseClient";

interface User {
  id: string;
  email: string;
  role: string;
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
    // 1️⃣ Check initial session
    const session = supabase.auth.getSession().then(({ data }) => {
      const supaUser = data.session?.user;
      if (supaUser) fetchUserRole(supaUser.id);
      else setLoading(false);
    });

    // 2️⃣ Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const supaUser = session?.user;
        if (supaUser) fetchUserRole(supaUser.id);
        else setUser(null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch role from profiles table or fallback to metadata
  const fetchUserRole = async (id: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("role, email")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      // fallback to metadata
      const metaUser = await supabase.auth.getUser();
      const role = metaUser.data.user?.user_metadata?.role || "unknown";
      setUser({
        id,
        email: metaUser.data.user?.email || "",
        role,
      });
    } else {
      setUser({
        id,
        email: data.email,
        role: data.role,
      });
    }
    setLoading(false);
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
