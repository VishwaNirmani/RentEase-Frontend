export const AUTH_SESSION_KEY = "rentease.auth";
export const AUTH_EXPIRED_EVENT = "rentease:auth-expired";

const validRoles = new Set(["Tenant", "Owner", "Admin"]);

export function isValidAuthSession(session) {
  return (
    session !== null &&
    typeof session === "object" &&
    Number.isFinite(Number(session.userId)) &&
    Number(session.userId) > 0 &&
    typeof session.email === "string" &&
    typeof session.role === "string" &&
    validRoles.has(session.role) &&
    typeof session.token === "string" &&
    session.token.length > 0 &&
    typeof session.expiresAt === "string" &&
    Number.isFinite(Date.parse(session.expiresAt))
  );
}

export function readAuthSession() {
  const savedSession = window.sessionStorage.getItem(AUTH_SESSION_KEY);

  if (!savedSession) {
    return null;
  }

  try {
    const session = JSON.parse(savedSession);

    if (
      !isValidAuthSession(session) ||
      Date.parse(session.expiresAt) <= Date.now()
    ) {
      clearAuthSession();
      return null;
    }

    return session;
  } catch (error) {
    console.warn("Clearing invalid saved RentEase authentication data.", error);
    clearAuthSession();
    return null;
  }
}

export function saveAuthSession(session) {
  window.sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  window.sessionStorage.removeItem(AUTH_SESSION_KEY);
}
