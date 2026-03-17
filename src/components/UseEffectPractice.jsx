import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Skeleton, Alert } from "./ui";

// Tab Navigation Component
function PracticeNavigation({ activePractice, setActivePractice }) {
  const practices = [
    { key: "localstorage", label: "LocalStorage" },
    {
      key: "api",
      label: (
        <span className="inline-flex items-center gap-1">
          API Fetch
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
            <path d="M5 12a7 7 0 0 1 14 0" />
            <path d="M8.5 12a3.5 3.5 0 0 1 7 0" />
            <path d="M12 16h.01" />
          </svg>
        </span>
      ),
    },
    { key: "timer", label: "Timer" },
    { key: "listener", label: "Event Listener" },
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

// LocalStorage Component - Persisting Data
function LocalStorageExample() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("my_todos");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Gagal memuat data:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("my_todos", JSON.stringify(todos));
  }, [todos]);

  const inputAddRef = useRef(null);

  useEffect(() => {
    inputAddRef.current?.focus();
  }, []);

  const [addText, setAddText] = useState("");
  const [isInputError, setIsInputError] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editErrorId, setEditErrorId] = useState(null);

  const addTodo = () => {
    const trimmedText = addText.trim();
    if (trimmedText === "") {
      setIsInputError(true);
      return;
    }
    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setAddText("");
    setIsInputError(false);
  };

  const toggleStatus = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const enterEditMode = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditErrorId(null);
  };

  const editTodo = () => {
    const trimmedText = editText.trim();
    if (trimmedText === "") {
      setEditErrorId(editingId);
      return;
    }
    setTodos(
      todos.map((todo) =>
        editingId !== null && todo.id === editingId
          ? { ...todo, text: trimmedText }
          : todo,
      ),
    );
    setEditingId(null);
    setEditText("");
    setEditErrorId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditErrorId(null);
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="w-full pt-8 border-t border-border-subtle space-y-4">
      <header>
        <h3 className="text-sm font-bold text-content-primary uppercase tracking-wider">
          LocalStorage Example
        </h3>
        <p className="text-xs text-content-secondary">
          Demo persistensi data dengan localStorage dan useEffect.
        </p>
      </header>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            minLength="1"
            value={addText}
            onChange={(e) => {
              setAddText(e.target.value);
              setIsInputError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
            ref={inputAddRef}
            placeholder="Apa yang ingin dikerjakan?"
            className={`w-full px-4 py-2 bg-surface-base border rounded-lg transition-all outline-none focus-visible:ring-2 text-content-primary
              ${
                isInputError
                  ? "border-status-error ring-2 ring-status-error/20 focus-visible:ring-status-error"
                  : "border-border-default focus-visible:ring-brand-primary"
              }`}
            aria-invalid={isInputError}
            aria-describedby={isInputError ? "todo-error" : undefined}
          />
          <Button
            onClick={addTodo}
            variant="primary"
            className="px-4 py-2 font-bold"
          >
            Tambah
          </Button>
        </div>
        <div className="min-h-5">
          {isInputError && (
            <p
              id="todo-error"
              className="text-xs text-status-error flex items-center gap-1 animate-in fade-in slide-in-from-top-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Ups! Tugas tidak boleh kosong.
            </p>
          )}
        </div>
        <ul className="space-y-3" aria-label="Daftar tugas">
          {todos.length === 0 ? (
            <p className="text-center text-content-tertiary py-6 italic text-sm">
              Belum ada tugas hari ini...
            </p>
          ) : (
            todos.map((todo) => {
              const isEditing = editingId === todo.id;
              return isEditing ? (
                <li
                  key={`edit-${todo.id}`}
                  className="flex flex-col gap-2 p-2 bg-brand-primary/5 border border-brand-primary/20 rounded-xl shadow-inner transition-all"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => {
                        setEditText(e.target.value);
                        setEditErrorId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") editTodo();
                        else if (e.key === "Escape") cancelEdit();
                      }}
                      className={`flex-1 px-3 py-1 bg-surface-base border rounded-md outline-none transition-all text-sm text-content-primary
                        ${
                          editErrorId === todo.id
                            ? "border-status-error ring-2 ring-status-error/20 focus:ring-status-error"
                            : "border-brand-primary/30 focus:ring-2 focus:ring-brand-primary"
                        }`}
                      autoFocus
                      aria-invalid={editErrorId === todo.id}
                      aria-describedby={`edit-error-${todo.id}`}
                    />
                    <Button
                      onClick={editTodo}
                      variant="primary"
                      className="px-3 py-1 text-xs font-bold"
                    >
                      Simpan
                    </Button>
                    <Button
                      onClick={cancelEdit}
                      variant="secondary"
                      className="px-3 py-1 text-xs font-bold"
                    >
                      Batal
                    </Button>
                  </div>
                  {editErrorId === todo.id && (
                    <p
                      id={`edit-error-${todo.id}`}
                      className="text-[10px] text-status-error font-medium px-1 animate-in fade-in slide-in-from-left-1 flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Teks edit tidak boleh kosong!
                    </p>
                  )}
                </li>
              ) : (
                <li
                  key={`normal-${todo.id}`}
                  className="flex items-center justify-between p-3 bg-surface-base border border-border-subtle rounded-xl shadow-sm group hover:border-brand-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="size-5 rounded border-border-default text-brand-primary focus:ring-brand-primary cursor-pointer"
                      onChange={() => toggleStatus(todo.id)}
                      checked={todo.isCompleted}
                    />
                    <span
                      className={`transition-all duration-50 ${
                        todo.isCompleted
                          ? "text-content-tertiary line-through decoration-content-tertiary/50 italic"
                          : "text-content-primary font-medium"
                      }`}
                    >
                      <span className="sr-only">
                        {todo.isCompleted ? "Tugas selesai: " : "Tugas aktif: "}
                      </span>
                      {todo.text}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      onClick={() => enterEditMode(todo)}
                      variant="secondary"
                      className="p-2 text-xs font-semibold"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteTodo(todo.id)}
                      variant="danger"
                      className="p-2 text-xs font-semibold"
                    >
                      Hapus
                    </Button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

// Timer Component - Countdown Timer
function TimerExample() {
  const initialSeconds = 10;

  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  // imperative
  const intervalId = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    document.title = `Timer: ${seconds}s | React Hooks Playground`;
  }, [seconds]);

  useEffect(() => {
    return () => {
      document.title = "useEffect | React Hooks Playground";
    };
  }, []);

  const startTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    setIsActive(true);
    intervalId.current = setInterval(
      () =>
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            clearInterval(intervalId.current);
            return 0;
          }
          return prev - 1;
        }),
      1000,
    );
  };

  const pauseTimer = () => {
    setIsActive(false);
    clearInterval(intervalId.current);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
    clearInterval(intervalId.current);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-content-primary">
        Timer Example
      </h3>
      <div className="text-center">
        <div className="text-4xl font-mono mb-4 text-content-primary">
          {seconds}s
        </div>
        <div className="flex gap-2 justify-center">
          <Button
            onClick={!isActive ? startTimer : pauseTimer}
            variant="primary"
            className="px-4 py-2"
          >
            {!isActive ? "Start" : "Pause"}
          </Button>
          <Button
            onClick={resetTimer}
            variant="secondary"
            className="px-4 py-2"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

// API Fetch Component - Template for Fetching Data
function FetchAPIExample() {
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
          "https://jsonplaceholder.typicode.com/todos?_limit=5",
          { signal },
        );

        if (!response.ok) throw new Error("Gagal mengambil data!");

        const data = await response.json();

        setTodos(data);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch dibatalkan: komponen unmount");
          return;
        } else {
          setError(error.message);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-content-primary">
        API Fetch Example
      </h3>

      {isLoading ? (
        <div role="status" aria-live="polite" className="space-y-2">
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
        </div>
      ) : error ? (
        <Alert type="error">Error: {error}</Alert>
      ) : todos.length === 0 ? (
        <p className="text-content-tertiary italic">
          Tidak ada data yang ditemukan.
        </p>
      ) : (
        <div className="space-y-2">
          {todos.map((item) => (
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

// Event Listener Component - Static UI Placeholder
function ListenerExample() {
  const [coord, setCoord] = useState({ x: null, y: null });

  const isThrottled = useRef(false);

  useEffect(() => {
    let timeoutId = null;

    const handleMouseMove = (event) => {
      if (isThrottled.current) return;

      setCoord({ x: event.clientX, y: event.clientY });
      isThrottled.current = true;

      timeoutId = setTimeout(() => {
        isThrottled.current = false;
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-content-primary">
        Event Listener Example
      </h3>
      <p className="text-content-secondary">
        Mouse position: X: {coord.x}, Y: {coord.y}
      </p>
    </div>
  );
}

// Main Component
export default function UseEffectPractice() {
  const [activePractice, setActivePractice] = useState("localstorage");

  const renderActivePractice = () => {
    switch (activePractice) {
      case "localstorage":
        return <LocalStorageExample />;
      case "api":
        return <FetchAPIExample />;
      case "timer":
        return <TimerExample />;
      case "listener":
        return <ListenerExample />;
      default:
        return <LocalStorageExample />;
    }
  };

  return (
    <article className="space-y-6" aria-labelledby="practice-heading">
      <header className="border-b border-border-subtle pb-4">
        <h2
          id="practice-heading"
          className="text-3xl font-semibold tracking-tight text-content-primary"
        >
          Demo: useEffect
        </h2>
        <p className="text-content-secondary mt-1">
          Mengelola side-effects, fetch API, dan cleanup.
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
        <p>
          // Output state atau console bisa dirender di sini untuk visualisasi
        </p>
      </Card>
    </article>
  );
}
