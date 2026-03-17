import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Card } from "./ui";

// Komponen EditProfile untuk mengedit profil user
function EditProfile() {
  const { user, setUser } = useContext(UserContext);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setUser((prev) => ({ ...prev, name: value }));
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-content-primary">
        Edit Profile
      </h2>
      <div className="space-y-1 text-sm text-content-secondary">
        <p>
          <strong className="text-content-primary">Name:</strong> {user.name}
        </p>
        <p>
          <strong className="text-content-primary">Email:</strong> {user.email}
        </p>
        <p>
          <strong className="text-content-primary">Age:</strong> {user.age}
        </p>
      </div>
      <form>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-content-primary"
          >
            Update Name:
          </label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => handleNameChange(e)}
            className="mt-2 block w-full rounded-lg border border-border-default bg-surface-base px-3 py-2 text-sm text-content-primary shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary"
          />
        </div>
      </form>
    </Card>
  );
}

function UserProfile() {
  const { user } = useContext(UserContext);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised/80 px-3 py-1.5 text-sm shadow-sm">
      <span className="text-sm font-medium text-content-primary">
        Welcome, {user.name}!
      </span>
      <div className="h-8 w-8 rounded-full bg-brand-primary text-brand-text flex items-center justify-center text-xs font-semibold">
        {user.name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border-default bg-surface-raised text-content-secondary shadow-sm hover:border-brand-primary/50 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base transition-colors"
    >
      {isDark ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function UseContextPractice() {
  return (
    <article className="space-y-6">
      <header className="border-b border-border-subtle pb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-content-primary">
          useContext Demo
        </h1>
        <p className="text-content-secondary max-w-2xl mt-1">
          Demo penggunaan useContext untuk mengelola state global.
        </p>
      </header>

      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md border border-border-default bg-surface-raised px-3 py-2 text-sm font-medium text-content-secondary shadow-sm hover:border-brand-primary/50 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base transition-all"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Kembali ke Menu
        </Link>
        <ThemeToggle />
      </div>

      <EditProfile />
    </article>
  );
}

export { UserProfile };
