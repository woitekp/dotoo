import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(credentials) {
    setUser({ login: credentials.login });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
