"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useAuthStore } from "@/store/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending, error } = useSession();
  const { setSession, setLoading } = useAuthStore();

  useEffect(() => {
    console.log("🔐 AuthProvider - Session State:", {
      session,
      isPending,
      error,
      hasSession: !!session,
      sessionData: session ? { userId: session.user?.id, email: session.user?.email } : null
    });

    setLoading(isPending);

    if (!isPending) {
      console.log("✅ Setting session in store:", session ? "SESSION EXISTS" : "NO SESSION");
      setSession(session ? session : null);
    }
  }, [session, isPending, error, setSession, setLoading]);

  return <>{children}</>;
}
