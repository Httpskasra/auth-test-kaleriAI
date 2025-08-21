"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "@lib/authService";
import { Storage } from "@lib/storage";
import { useRouter } from "next/navigation";
export type RandomUser = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
  location: { city: string; country: string };
};
interface AuthContextValue {
  user: RandomUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  requireAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<RandomUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = Storage.get<RandomUser>("auth:user");
    if (stored) setUser(stored);
  }, []);

  const login = useCallback(async () => {
    setLoading(true);
    try {
      const u = await AuthService.fetchRandomUser();
      setUser(u);
      Storage.set("auth:user", u);
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    Storage.remove("auth:user");
    router.replace("/auth");
  }, [router]);

  const requireAuth = useCallback(() => {
    if (!Storage.get("auth:user")) {
      router.replace("/auth");
    }
  }, [router]);

  const value = useMemo(
    () => ({ user, loading, login, logout, requireAuth }),
    [user, loading, login, logout, requireAuth]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
