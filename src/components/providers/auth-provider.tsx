"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useAuthStore } from "@/store/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending, error } = useSession();
  const { setSession, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(isPending);

    if (!isPending) {
      setSession(session ? session : null);
    }
  }, [session, isPending, error, setSession, setLoading]);

  return <>{children}</>;
}
