import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useRef, useEffect } from "react";

import UseStatePractice from "./pages/UseStatePractice";
import UseEffectPractice from "./pages/UseEffectPractice";
import UseMemoPractice from "./pages/UseMemoPractice";
import UseCallbackPractice from "./pages/UseCallbackPractice";
import UseContextPractice, { UserProfile } from "./pages/UseContextPractice";
import UseReducerPractice from "./pages/UseReducerPractice";

import MainMenu from "./components/MainMenu";
import ConnectionStatus from "./components/ConnectionStatus";

function Page({ title, children }) {
  useEffect(() => {
    document.title = `${title} | React Hooks Playground`;
  }, [title]);

  return children;
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-surface-base transition-colors duration-300">
      {/* 1. Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-primary text-brand-text px-4 py-2 rounded-md z-50 focus-visible:ring-4 focus-visible:ring-brand-hover focus-visible:outline-none"
      >
        Skip to main content
      </a>

      <ConnectionStatus />

      <header className="backdrop-blur border-b border-border-subtle sticky top-0 z-10 bg-surface-overlay">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
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
                <circle cx="12" cy="12" r="3" className="fill-brand-primary" />
                <path
                  d="M3 12c3-4 7-6 9-6s6 2 9 6c-3 4-7 6-9 6s-6-2-9-6z"
                  className="stroke-brand-primary"
                />
              </svg>
            </span>
            <span>React Hooks Playground</span>
          </h1>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <UserProfile />
          </div>
          {/* Mobile hamburger menu */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-border-default bg-surface-raised text-content-secondary hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base transition-colors"
          >
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
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          {/* Mobile dropdown */}
          {isMenuOpen && (
            <div
              ref={dropdownRef}
              className="md:hidden absolute top-full right-0 mt-2 w-64 bg-surface-raised border border-border-subtle rounded-lg shadow-lg z-20"
            >
              <div className="p-4 space-y-3">
                <UserProfile />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 2. Main content with aria-live so screen readers know when components change */}
      <main
        id="main-content"
        className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10"
        aria-live="polite"
        tabIndex="-1"
      >
        <Routes>
          <Route
            path="/"
            element={
              <Page title="Main Menu">
                <MainMenu />
              </Page>
            }
          />
          <Route
            path="/usestate"
            element={
              <Page title="useState">
                <UseStatePractice />
              </Page>
            }
          />
          <Route
            path="/useeffect"
            element={
              <Page title="useEffect">
                <UseEffectPractice />
              </Page>
            }
          />
          <Route
            path="/usecontext"
            element={
              <Page title="useContext">
                <UseContextPractice />
              </Page>
            }
          />
          <Route
            path="/usereducer"
            element={
              <Page title="useReducer">
                <UseReducerPractice />
              </Page>
            }
          />
          <Route
            path="/usememo"
            element={
              <Page title="useMemo">
                <UseMemoPractice />
              </Page>
            }
          />
          <Route
            path="/usecallback"
            element={
              <Page title="useCallback">
                <UseCallbackPractice />
              </Page>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
