import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AUTH_STORAGE_KEY = "baby-shop-auth";

const loadAuth = () => {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(loadAuth);
  const [loading, setLoading] = useState(true);

  // On mount, validate the saved token
  useEffect(() => {
    const initialToken = loadAuth().token;
    if (!initialToken) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${initialToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        setAuth((prev) => ({ ...prev, user: data.user }));
      })
      .catch(() => {
        // Token expired or invalid — clear it
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setAuth({ token: null, user: null });
      })
      .finally(() => setLoading(false));
  }, []);

  // Persist auth state
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [auth]);

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    setAuth({ token: data.token, user: data.user });
    return data.user;
  };

  const register = async (name, email, password) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    setAuth({ token: data.token, user: data.user });
    return data.user;
  };

  const logout = () => {
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!auth.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
