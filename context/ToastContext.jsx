"use client";

import { createContext, useContext, useCallback, useState, useRef } from "react";
import { CheckCircle2, X } from "lucide-react";

const ToastContext = createContext(null);
let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const showToast = useCallback(
    (message) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message }]);
      timers.current[id] = setTimeout(() => dismiss(id), 3200);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-850 px-4 py-3 shadow-glow toast-in"
            role="status"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
            <p className="flex-1 text-sm font-medium text-white">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-ink-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
