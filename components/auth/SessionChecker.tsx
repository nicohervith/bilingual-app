// components/SessionChecker.tsx
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

export const SessionChecker = () => {
  const { user, checkSession } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        const isValid = await checkSession();
        if (!isValid) {
          router.replace("/login");
        }
      }
    }, 5 * 60 * 1000); // Verificar cada 5 minutos

    return () => clearInterval(interval);
  }, [user]);

  return null;
};
