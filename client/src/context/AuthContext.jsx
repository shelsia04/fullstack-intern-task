import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const isAuthed = !!token;

  function login(newToken, newUser) {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  }

  const value = useMemo(() => ({ token, user, isAuthed, login, logout }), [token, user, isAuthed]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
