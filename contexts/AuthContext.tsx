// hooks/useAuth.ts
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { useEffect, useState, createContext, useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect, router } from "expo-router";
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      setUser(user);
      setLoading(false);

      // Agrega esto para debuggear
      if (user) {
        console.log("User logged in:", user.email);
        // Forzar una actualización del router
        router.replace("/");
      } else {
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
