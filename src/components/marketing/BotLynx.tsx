"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const initialBotMessage =
  "\u00a1Hola! \u{1F44B} Soy el asistente virtual de LYNX. \u00bfCual es tu nombre?";
const askEmail = (name: string) =>
  `Un gusto, ${name}. \u00bfA qu\u00e9 email te podemos escribir?`;
const askMessage = "\u00bfC\u00f3mo podemos ayudarte hoy?";
const successMessage =
  "\u00a1Recibido! Nos pondremos en contacto pronto.";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

type HistoryItem = {
  role: "bot" | "user";
  content: string;
};

export default function BotLynx() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState(initialForm);
  const [history, setHistory] = useState<HistoryItem[]>([
    { role: "bot", content: initialBotMessage },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen]);

  const addToHistory = (item: HistoryItem) => {
    setHistory((prev) => [...prev, item]);
  };

  const submitData = async (payload: {
    name: string;
    email: string;
    message: string;
  }) => {
    setStep(3);

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStep(4);
        addToHistory({ role: "bot", content: successMessage });
      } else {
        alert("Ocurrio un error al enviar. Intenta nuevamente.");
        setStep(2);
      }
    } catch (error) {
      alert("Ocurrio un error al enviar. Intenta nuevamente.");
      setStep(2);
    }
  };

  const handleSend = async () => {
    const value = input.trim();
    if (!value || step === 3 || step === 4) {
      return;
    }

    addToHistory({ role: "user", content: value });
    setInput("");

    if (step === 0) {
      setFormData((prev) => ({ ...prev, name: value }));
      addToHistory({ role: "bot", content: askEmail(value) });
      setStep(1);
      return;
    }

    if (step === 1) {
      setFormData((prev) => ({ ...prev, email: value }));
      addToHistory({ role: "bot", content: askMessage });
      setStep(2);
      return;
    }

    if (step === 2) {
      const payload = { ...formData, message: value };
      setFormData(payload);
      await submitData({
        name: payload.name,
        email: payload.email,
        message: value,
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              className="absolute bottom-16 right-0 flex h-[450px] w-[350px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">
                    LYNX Bot
                  </p>
                  <p className="text-xs text-[var(--muted)]">Asistente virtual</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-[var(--muted)] hover:text-[var(--text)]"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {history.map((item, index) => (
                  <motion.div
                    key={`${item.role}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${
                      item.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        item.role === "user"
                          ? "bg-[var(--accent)] text-[var(--bg)]"
                          : "border border-[var(--border)] bg-[var(--bg)] text-[var(--text)]"
                      }`}
                    >
                      {item.content}
                    </div>
                  </motion.div>
                ))}
                <div ref={endRef} />
              </div>

              <div className="border-t border-[var(--border)] px-4 py-3">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={
                      step === 0
                        ? "Nombre"
                        : step === 1
                          ? "Email"
                          : "Mensaje"
                    }
                    disabled={step === 3 || step === 4}
                    className="flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={step === 3 || step === 4}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)] shadow-sm transition-colors hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Enviar"
                  >
                    {step === 3 ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)] shadow-xl"
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
