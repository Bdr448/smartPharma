import { createContext, useContext, useState, useEffect } from "react";
import { verifyToken } from "../api"; // You’ll create this API call

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // for delay during auto-login

  // Auto-login on first load
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await verifyToken(token);
        if (res.user) {
          setUser(res.user);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Token verification failed", err);
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
