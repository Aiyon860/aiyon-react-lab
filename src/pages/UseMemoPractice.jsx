import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Skeleton, Alert } from "../components/ui";

// Tab Navigation Component
function PracticeNavigation({ activePractice, setActivePractice }) {
  const practices = [
    { key: "withmemo", label: "With useMemo" },
    {
      key: "withoutmemo",
      label: (
        <span className="inline-flex items-center gap-1">
          Without useMemo
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.3 3.6 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3l-8.1-14.4a2 2 0 0 0-3.4 0Z" />
          </svg>
        </span>
      ),
    },
  ];

  return (
    <nav
      className="border-b border-border-subtle mb-6"
      aria-label="Practice Tabs"
    >
      <ul className="flex">
        {practices.map((practice) => (
          <li key={practice.key} className="flex-1">
            <button
              onClick={() => setActivePractice(practice.key)}
              className={`w-full py-3 px-4 text-sm font-medium transition-colors border-b-2 rounded-t-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base ${
                activePractice === practice.key
                  ? "border-brand-primary text-brand-primary bg-brand-primary/5"
                  : "border-transparent text-content-secondary hover:text-content-primary hover:bg-surface-sunken"
              }`}
            >
              {practice.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Shared fetch logic
function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10",
          { signal },
        );

        if (!response.ok) throw new Error("Failed to fetch data!");

        const data = await response.json();

        setTodos(data);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch cancelled: component unmount");
        } else {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  return { todos, isLoading, error };
}

// Search Filter Example - Using useMemo for filtering
function SearchFilterWithMemo({ todos, isLoading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  const filteredTodos = useMemo(() => {
    console.log("Memo: Filtered todos recalculated");
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [todos, searchTerm]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-content-primary">
        Search Filter with useMemo
      </h3>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => setCount((prev) => prev + 1)}
          variant="primary"
          className="px-3 py-1"
        >
          +
        </Button>
        <span className="text-lg font-mono text-content-primary">{count}</span>
      </div>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-border-default rounded-lg bg-surface-base text-content-primary placeholder-content-tertiary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none"
      />

      {isLoading ? (
        <Skeleton
          items={[
            {
              height: "h-12",
              className:
                "rounded-lg border border-border-subtle bg-surface-sunken",
            },
            {
              height: "h-12",
              className:
                "rounded-lg border border-border-subtle bg-surface-sunken",
            },
            {
              height: "h-12",
              className:
                "rounded-lg border border-border-subtle bg-surface-sunken",
            },
          ]}
        />
      ) : error ? (
        <Alert type="error">Error: {error}</Alert>
      ) : filteredTodos.length === 0 ? (
        <p className="text-content-tertiary italic">No data found.</p>
      ) : (
        <div className="space-y-2">
          {filteredTodos.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-surface-base border border-border-subtle rounded-lg shadow-sm"
            >
              <input
                type="checkbox"
                checked={item.completed}
                readOnly
                className="size-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
              />
              <span
                className={`flex-1 ${
                  item.completed
                    ? "text-content-tertiary line-through"
                    : "text-content-primary"
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Search Filter Example - Without useMemo
function SearchFilterWithoutMemo({ todos, isLoading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  // Without useMemo, this recalculates on every render
  const filteredTodos = (() => {
    console.log("Without Memo: Filtered todos recalculated");
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  })();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-content-primary">
        Search Filter without useMemo
      </h3>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => setCount((prev) => prev + 1)}
          variant="primary"
          className="px-3 py-1"
        >
          +
        </Button>
        <span className="text-lg font-mono text-content-primary">{count}</span>
      </div>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-border-default rounded-lg bg-surface-base text-content-primary placeholder-content-tertiary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none"
      />

      {isLoading ? (
        <Skeleton
          items={[
            {
              height: "h-12",
              className:
                "rounded-lg border border-border-subtle bg-surface-sunken",
            },
            {
              height: "h-12",
              className:
                "rounded-lg border border-border-subtle bg-surface-sunken",
            },
            {
              height: "h-12",
              className:
                "rounded-lg border border-border-subtle bg-surface-sunken",
            },
          ]}
        />
      ) : error ? (
        <Alert type="error">Error: {error}</Alert>
      ) : filteredTodos.length === 0 ? (
        <p className="text-content-tertiary italic">No data found.</p>
      ) : (
        <div className="space-y-2">
          {filteredTodos.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-surface-base border border-border-subtle rounded-lg shadow-sm"
            >
              <input
                type="checkbox"
                checked={item.completed}
                readOnly
                className="size-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
              />
              <span
                className={`flex-1 ${
                  item.completed
                    ? "text-content-tertiary line-through"
                    : "text-content-primary"
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Component
export default function UseMemoPractice() {
  const [activePractice, setActivePractice] = useState("withmemo");
  const { todos, isLoading, error } = useTodos();

  const renderActivePractice = () => {
    switch (activePractice) {
      case "withmemo":
        return (
          <SearchFilterWithMemo
            todos={todos}
            isLoading={isLoading}
            error={error}
          />
        );
      case "withoutmemo":
        return (
          <SearchFilterWithoutMemo
            todos={todos}
            isLoading={isLoading}
            error={error}
          />
        );
      default:
        return (
          <SearchFilterWithMemo
            todos={todos}
            isLoading={isLoading}
            error={error}
          />
        );
    }
  };

  return (
    <article className="space-y-6" aria-labelledby="practice-heading">
      <header className="border-b border-border-subtle pb-4">
        <h2
          id="practice-heading"
          className="text-3xl font-semibold tracking-tight text-content-primary"
        >
          Demo: useMemo
        </h2>
        <p className="text-content-secondary mt-1">
          Demo performance optimization with useMemo.
        </p>
      </header>

      <div className="mb-6">
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
          Back to Menu
        </Link>
      </div>

      <Card aria-label="Area Eksperimen Interaktif">
        <PracticeNavigation
          activePractice={activePractice}
          setActivePractice={setActivePractice}
        />
        {renderActivePractice()}
      </Card>

      <Card
        className="bg-surface-sunken text-sm text-content-secondary font-mono border-none"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="sr-only">Application log:</p>
        <div>
          <p>// Notes: Open Console (F12) to see the difference.</p>
          <p>
            // With useMemo: Clicking counter button does not trigger
            console.log "Memo: Filtered todos recalculated" because
            filteredTodos is not recalculated.
          </p>
          <p>
            // Without useMemo: Clicking counter button triggers console.log
            "Without Memo: Filtered todos recalculated" because every render
            recalculates filteredTodos.
          </p>
        </div>
      </Card>
    </article>
  );
}
