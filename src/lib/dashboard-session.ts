const STORAGE_KEY = "growth-group-dashboard-session";

export type DashboardSession = {
  email: string;
  name: string;
  signedInAt: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Preview-only: replace with Supabase Auth when the backend is connected. */
export function signIn(email: string, password: string): DashboardSession | null {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  if (!trimmedEmail || !trimmedPassword) return null;
  if (!trimmedEmail.includes("@")) return null;
  if (trimmedPassword.length < 4) return null;

  const session: DashboardSession = {
    email: trimmedEmail,
    name: trimmedEmail.split("@")[0].replace(/[._]/g, " ") || "Leader",
    signedInAt: new Date().toISOString(),
  };

  if (isBrowser()) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }
  return session;
}

export function signOut(): void {
  if (isBrowser()) {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}

export function getSession(): DashboardSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DashboardSession;
    if (!parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}
