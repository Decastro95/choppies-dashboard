import { useAuth } from "../context/AuthContext";

export default function useAuthHook() {
  const { user, setUser } = useAuth();
  return { user, setUser };
}
