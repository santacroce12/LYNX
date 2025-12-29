"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Loader2 } from "lucide-react";

const initialBotMessage =
  "¡Hola! 👋 Soy el asistente virtual de LYNX. ¿En qué puedo ayudarte?";

type ChatMessage = {
  role: "bot" | "user";
  content: string;
};

type SubmitContactPayload = {
  action: "submit_contact";
  data: {
    name: string;
    email: string;
    message: string;
  };
};

const parseSubmitPayload = (text: string): SubmitContactPayload | null => {
  try {
    const parsed = JSON.parse(text);
    if (!parsed || parsed.action !== "submit_contact") {
      return null;
    }

    const data = parsed.data ?? {};
    if (!data.name || !data.email || !data.message) {
      return null;
    }

    return {
      action: "submit_contact",
      data: {
        name: String(data.name),
        email: String(data.email),
        message: String(data.message),
      },
    };
  } catch (error) {
    return null;
  }
};

export default function BotLynx() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: "bot", content: initialBotMessage },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen, isLoading, isSubmitting]);

  const handleSend = async () => {
    const value = input.trim();
    if (!value || isLoading || isSubmitting) {
      return;
    }

    const nextHistory = [...history, { role: "user", content: value }];
    setHistory(nextHistory);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map((message) => ({
            role: message.role === "bot" ? "assistant" : "user",
            content: message.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const responseText = typeof data?.response === "string" ? data.response : "";
      const cleanedText = responseText.trim();
      const submitPayload = cleanedText ? parseSubmitPayload(cleanedText) : null;

      if (submitPayload) {
        setIsLoading(false);
        setIsSubmitting(true);
        setHistory((prev) => [
          ...prev,
          { role: "bot", content: "Enviando solicitud..." },
        ]);

        const submitResponse = await fetch("/contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitPayload.data),
        });

        if (submitResponse.ok) {
          setHistory((prev) => [
            ...prev,
            { role: "bot", content: "¡Listo! He enviado tus datos al equipo. 🚀" },
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            {
              role: "bot",
              content: "Ocurrió un error al enviar tus datos. Intentá nuevamente.",
            },
          ]);
        }
        setIsSubmitting(false);
        return;
      }

      const reply = cleanedText ||
        "Gracias por tu consulta. Un especialista puede ayudarte con más detalle.";

      setHistory((prev) => [...prev, { role: "bot", content: reply }]);
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        { role: "bot", content: "Ocurrió un error. Intentá nuevamente." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              className="absolute bottom-16 right-0 flex h-[70vh] w-[90vw] max-h-[520px] max-w-[360px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl sm:h-[450px] sm:w-[350px]"
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
                {isLoading ? (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm text-[var(--muted)]">
                      Escribiendo...
                    </div>
                  </div>
                ) : null}
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
                    placeholder="Escribe tu consulta..."
                    disabled={isLoading || isSubmitting}
                    className="flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)] shadow-sm transition-colors hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Enviar"
                  >
                    {isLoading || isSubmitting ? (
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
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
