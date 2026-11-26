import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import apiClient from "../api/apiClient";
import AuthContext from "./authContextValue";
import {
  AUTH_EXPIRED_EVENT,
  clearAuthSession,
  isValidAuthSession,
  readAuthSession,
  saveAuthSession,
} from "../auth/authStorage";

function createAuthSession(response) {
  const session = {
    userId: response.userId,
    email: response.email,
    role: response.role,
    token: response.token,
    expiresAt: response.expiresAt,
  };

  if (
    !isValidAuthSession(session) ||
    Date.parse(session.expiresAt) <= Date.now()
  ) {
    throw new Error("The API returned an invalid or expired login session.");
  }

  return session;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readAuthSession);

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  const authenticate = useCallback(async (endpoint, credentials) => {
    const response = await apiClient.post(endpoint, credentials);
    const session = createAuthSession(response.data);

    saveAuthSession(session);
    setUser(session);

    return session;
  }, []);

  const login = useCallback(
    (credentials) => authenticate("/auth/login", credentials),
    [authenticate],
  );

  const register = useCallback(
    async (userDetails) => {
      await apiClient.post("/auth/register", userDetails);
    },
    [],
  );

  useEffect(() => {
    const handleExpiredSession = () => logout();

    window.addEventListener(AUTH_EXPIRED_EVENT, handleExpiredSession);

    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleExpiredSession);
    };
  }, [logout]);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    const remainingTime = Date.parse(user.expiresAt) - Date.now();

    const timeoutId = window.setTimeout(
      logout,
      Math.max(remainingTime, 0),
    );

    return () => window.clearTimeout(timeoutId);
  }, [logout, user]);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
