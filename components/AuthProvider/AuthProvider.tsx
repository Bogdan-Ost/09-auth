"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      if (pathname === "/sign-up" || pathname === "/sign-in") {
        setIsLoading(false);
        return;
      }

      try {
        const user = await checkSession();
        if (user) setUser(user);
      } catch (error) {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  const isPublicPage = pathname === "/sign-up" || pathname === "/sign-in";

  if (isLoading && !isPublicPage) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
