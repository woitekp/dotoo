import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { registerUser, loginUser, logoutUser, fetchMe } from "@/api/auth";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  async function login(credentials) {
    const data = await loginUser(credentials);
    setUser(data.user);
  }

  async function register(credentials) {
    const data = await registerUser(credentials);
    setUser(data.user);
  }

  async function logout() {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
