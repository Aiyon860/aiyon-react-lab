import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "./ui";

const maxCharCount = 20;

// Tab Navigation Component
function PracticeNavigation({ activePractice, setActivePractice }) {
  const practices = [
    { key: "character", label: "Character Counter" },
    { key: "calculator", label: "Calculator" },
    { key: "counter", label: "Counter" },
    { key: "todo", label: "Todo List" },
  ];

  return (
    <nav className="border-b border-border-subtle mb-6" aria-label="Demo Tabs">
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

// Character Counter Component
function CharacterCounter() {
  const [charCount, setCharCount] = useState(0);
  const isOverLimit = charCount > maxCharCount;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end">
        <label
          htmlFor="message"
          className="text-sm font-bold text-content-primary uppercase tracking-wider"
        >
          Pesan Singkat
        </label>
        <span
          aria-live="polite"
          className={`text-xs font-mono ${isOverLimit ? "text-status-error font-bold" : "text-content-tertiary"}`}
        >
          {charCount} / {maxCharCount}
        </span>
      </div>
      <input
        id="message"
        type="text"
        className={`w-full px-4 py-2 bg-surface-base border rounded-lg transition-all outline-none text-content-primary
          ${
            isOverLimit
              ? "border-status-error ring-2 ring-status-error/20 focus-visible:ring-status-error focus-visible:border-status-error"
              : "border-border-default focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary"
          }`}
        aria-invalid={isOverLimit}
        aria-describedby="message-error"
        onChange={(e) => setCharCount(e.target.value.length)}
      />
      <div className="min-h-7">
        {isOverLimit && (
          <p
            id="message-error"
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
            Batas maksimal adalah {maxCharCount} karakter!
          </p>
        )}
      </div>
    </div>
  );
}

// Simple Calculator Component
function SimpleCalculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const isError = operator === "/" && num2 === 0;

  let result;
  if (!isError) {
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        result = 0;
    }
  }

  return (
    <div className="w-full py-8 border-t border-border-subtle space-y-4">
      <header>
        <h3 className="text-sm font-bold text-content-primary uppercase tracking-wider">
          Kalkulator Sederhana
        </h3>
      </header>
      <div className="flex items-center gap-2">
        <input
          type="number"
          aria-label="Bilangan pertama"
          placeholder="0"
          className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-lg text-content-primary focus-visible:ring-2 focus-visible:ring-brand-primary outline-none"
          onChange={(e) => setNum1(Number(e.target.value))}
        />
        <select
          aria-label="Pilih operasi"
          className="px-2 py-2 bg-surface-sunken border border-border-default rounded-lg text-content-primary focus-visible:ring-2 focus-visible:ring-brand-primary outline-none"
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <input
          type="number"
          aria-label="Bilangan kedua"
          placeholder="0"
          className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-lg text-content-primary focus-visible:ring-2 focus-visible:ring-brand-primary outline-none"
          onChange={(e) => setNum2(Number(e.target.value))}
        />
      </div>
      <div
        className={`p-4 rounded-xl border text-center transition-all ${
          isError
            ? "bg-status-error/10 border-status-error/20"
            : "bg-brand-primary/10 border-brand-primary/20"
        }`}
        aria-live="polite"
      >
        {isError ? (
          <p className="text-sm text-status-error font-medium flex items-center justify-center gap-2">
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
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.3 3.6 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3l-8.1-14.4a2 2 0 0 0-3.4 0Z" />
            </svg>
            Tidak bisa membagi dengan nol!
          </p>
        ) : (
          <p className="text-sm text-brand-primary font-medium">
            Hasil: <span className="text-xl font-bold">{result}</span>
          </p>
        )}
      </div>
    </div>
  );
}

// Counter Component
function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="w-full py-8 border-t border-border-subtle space-y-4">
      <header>
        <h3 className="text-sm font-bold text-content-primary uppercase tracking-wider">
          Increment & Decrement Counter
        </h3>
        <p className="text-xs text-content-tertiary">
          Demo Functional Update & Limitasi Angka
        </p>
      </header>
      <div className="flex flex-col items-center bg-surface-sunken p-6 rounded-2xl border border-border-subtle gap-6">
        <div
          className="text-6xl font-black text-brand-primary tabular-nums"
          aria-live="polite"
        >
          {count}
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleDecrement}
            aria-label="Kurangi angka"
            variant="secondary"
            className="size-12 flex items-center justify-center text-2xl font-bold"
          >
            −
          </Button>
          <Button
            onClick={handleReset}
            variant="secondary"
            className="px-6 py-2 font-semibold"
          >
            Reset
          </Button>
          <Button
            onClick={handleIncrement}
            aria-label="Tambah angka"
            variant="primary"
            className="size-12 flex items-center justify-center text-2xl font-bold"
          >
            +
          </Button>
        </div>
        <p className="text-[10px] text-content-tertiary text-center uppercase tracking-widest">
          Tips: Coba gunakan functional update{" "}
          <code className="text-content-secondary">(prev) =&gt; prev + 1</code>
        </p>
      </div>
    </div>
  );
}

// TodoList Component
function TodoList() {
  const [todos, setTodos] = useState([]);
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
          Simple Todo List
        </h3>
        <p className="text-xs text-content-secondary">
          Demo CRUD: Create, Read, Update, Delete
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

// Main Component
export default function UseStatePractice() {
  const [activePractice, setActivePractice] = useState("character");

  const renderActivePractice = () => {
    switch (activePractice) {
      case "character":
        return <CharacterCounter />;
      case "calculator":
        return <SimpleCalculator />;
      case "counter":
        return <Counter />;
      case "todo":
        return <TodoList />;
      default:
        return <CharacterCounter />;
    }
  };

  return (
    <article className="space-y-6" aria-labelledby="practice-heading">
      <header className="border-b border-border-subtle pb-4">
        <h2
          id="practice-heading"
          className="text-3xl font-semibold tracking-tight text-content-primary"
        >
          Demo: useState
        </h2>
        <p className="text-content-secondary mt-1">
          Mengelola data reaktif di dalam komponen.
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
