import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, Skeleton, Alert } from "./ui";
import { Link } from "react-router";

// Tab Navigation Component
function PracticeNavigation({ activePractice, setActivePractice }) {
  const practices = [
    { key: "withcallback", label: "With useCallback" },
    {
      key: "withoutcallback",
      label: (
        <span className="inline-flex items-center gap-1">
          Without useCallback
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

// TodoItem Component with React.memo
const TodoItem = React.memo(({ id, title, completed, onToggle }) => {
  console.log("Anak di-render: " + id);
  return (
    <div className="flex items-center gap-3 p-3 bg-surface-base border border-border-subtle rounded-lg shadow-sm">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="size-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
      />
      <span
        className={`flex-1 ${
          completed
            ? "text-content-tertiary line-through"
            : "text-content-primary"
        }`}
      >
        {title}
      </span>
    </div>
  );
});

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

        if (!response.ok) throw new Error("Gagal mengambil data!");

        const data = await response.json();

        setTodos(data);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch dibatalkan: komponen unmount");
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

// Todo List with useCallback
function TodoListWithCallback({ todos, isLoading, error }) {
  const [count, setCount] = useState(0);

  const handleToggle = useCallback((id) => {
    console.log("Toggle handler called for id:", id);
    // In real app, update todos state
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-content-primary">
        Todo List with useCallback
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
      ) : todos.length === 0 ? (
        <p className="text-content-tertiary italic">
          Tidak ada data yang ditemukan.
        </p>
      ) : (
        <div className="space-y-2">
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              title={item.title}
              completed={item.completed}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Todo List without useCallback
function TodoListWithoutCallback({ todos, isLoading, error }) {
  const [count, setCount] = useState(0);

  const handleToggle = (id) => {
    console.log("Toggle handler called for id:", id);
    // In real app, update todos state
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-content-primary">
        Todo List without useCallback
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
      ) : todos.length === 0 ? (
        <p className="text-content-tertiary italic">
          Tidak ada data yang ditemukan.
        </p>
      ) : (
        <div className="space-y-2">
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              title={item.title}
              completed={item.completed}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main Component
export default function UseCallbackPractice() {
  const [activePractice, setActivePractice] = useState("withcallback");
  const { todos, isLoading, error } = useTodos();

  const renderActivePractice = () => {
    switch (activePractice) {
      case "withcallback":
        return (
          <TodoListWithCallback
            todos={todos}
            isLoading={isLoading}
            error={error}
          />
        );
      case "withoutcallback":
        return (
          <TodoListWithoutCallback
            todos={todos}
            isLoading={isLoading}
            error={error}
          />
        );
      default:
        return (
          <TodoListWithCallback
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
          Demo: useCallback
        </h2>
        <p className="text-content-secondary mt-1">
          Demo mencegah re-render dengan useCallback.
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
          Kembali ke Menu
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
        <p className="sr-only">Log aplikasi:</p>
        <div>
          <p>
            // Notes: Buka Console (F12) untuk melihat perbedaan re-render
            TodoItem.
          </p>
          <p>
            // Dengan useCallback: Klik tombol counter tidak memicu re-render
            TodoItem karena onToggle stabil.
          </p>
          <p>
            // Tanpa useCallback: Klik tombol counter memicu re-render semua
            TodoItem karena onToggle baru setiap render.
          </p>
        </div>
      </Card>
    </article>
  );
}
