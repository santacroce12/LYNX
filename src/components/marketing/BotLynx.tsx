"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";

// --- 1. Tipos y Utilidades ---
const initialBotMessage = "?Hola! ?? Soy el asistente virtual de LYNX. ?En qu? puedo ayudarte hoy?";

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

// Funci?n para detectar si el bot nos pide enviar el formulario
const parseSubmitPayload = (text: string): SubmitContactPayload | null => {
  try {
    const parsed = JSON.parse(text);
    if (!parsed || parsed.action !== "submit_contact") return null;
    const data = parsed.data ?? {};
    if (!data.name || !data.email || !data.message) return null;

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

// --- 2. Sub-componente: Animaci?n de "Escribiendo..." ---
const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-1">
    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--accent)] [animation-delay:-0.3s]" />
    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--accent)] [animation-delay:-0.15s]" />
    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--accent)]" />
  </div>
);

// --- 3. Componente Principal ---
export default function BotLynx() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: "bot", content: initialBotMessage },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll al fondo cuando llega un mensaje
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isLoading, isSubmitting, isOpen]);

  const handleSend = async () => {
    const value = input.trim();
    if (!value || isLoading || isSubmitting) return;

    // 1. Agregar mensaje del usuario inmediatamente
    const userMsg: ChatMessage = { role: "user", content: value };
    const nextHistory = [...history, userMsg];
    setHistory(nextHistory);
    setInput("");
    setIsLoading(true); // Activar animaci?n de "escribiendo"

    try {
      // 2. Enviar al Backend (PHP)
      const response = await fetch("/chat.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Error en la red");

      const data = await response.json();
      const responseText = typeof data?.response === "string" ? data.response : "";
      const cleanedText = responseText.trim();

      // 3. Revisar si es una orden de contacto (JSON oculto)
      const submitPayload = cleanedText ? parseSubmitPayload(cleanedText) : null;

      if (submitPayload) {
        setIsLoading(false);
        setIsSubmitting(true);
        // Mensaje temporal del bot mientras env?a el mail
        setHistory((prev) => [
          ...prev,
          { role: "bot", content: "Procesando tu solicitud... ??" },
        ]);

        const submitResponse = await fetch("/contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitPayload.data),
        });

        if (submitResponse.ok) {
          setHistory((prev) => [
            ...prev,
            {
              role: "bot",
              content:
                "?Excelente! He enviado tus datos al equipo. Nos pondremos en contacto pronto. ??",
            },
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            {
              role: "bot",
              content:
                "Tuve un peque?o problema t?cnico al enviar el correo. Por favor, intenta de nuevo o escr?benos a contacto@lynx.cl.",
            },
          ]);
        }
        setIsSubmitting(false);
        return;
      }

      // 4. Respuesta normal del Bot
      const reply =
        cleanedText ||
        "Disculpa, no pude procesar eso. ?Podr?as reformularlo?";
      setHistory((prev) => [...prev, { role: "bot", content: reply }]);
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Lo siento, parece que hay un problema de conexi?n. Intenta m?s tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-[600px] w-[90vw] max-h-[70vh] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl backdrop-blur-xl"
          >
            {/* --- HEADER --- */}
            <div className="relative flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/50 px-5 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--accent)] to-orange-400 shadow-lg">
                  <Bot className="h-6 w-6 text-white" />
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-[var(--surface)] bg-green-500 ring-1 ring-green-500/30" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text)]">LYNX AI</h3>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                    En l?nea
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-[var(--bg)] hover:text-[var(--text)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* --- CHAT AREA --- */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-[var(--bg)]/50 p-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--border)]">
              {history.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]">
                      <Bot className="h-4 w-4 text-[var(--accent)]" />
                    </div>
                  )}

                  <div
                    className={`relative max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      msg.role === "user"
                        ? "rounded-br-none bg-[var(--accent)] text-white"
                        : "rounded-bl-none border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Indicador de escribiendo... */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]">
                    <Bot className="h-4 w-4 text-[var(--accent)]" />
                  </div>
                  <div className="rounded-2xl rounded-bl-none border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-sm">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              <div ref={endRef} />
            </div>

            {/* --- INPUT AREA --- */}
            <div className="border-t border-[var(--border)] bg-[var(--surface)] p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu consulta..."
                  disabled={isLoading || isSubmitting}
                  className="w-full rounded-full border border-[var(--border)] bg-[var(--bg)] py-3 pl-5 pr-12 text-sm text-[var(--text)] shadow-inner placeholder:text-[var(--muted)] transition-all focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] p-2 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <div className="mt-2 text-center">
                <p className="flex items-center justify-center gap-1 text-[10px] text-[var(--muted)]">
                  <Sparkles className="h-3 w-3" /> Potenciado por IA de LYNX
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LAUNCHER BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
      >
        {/* Efecto de Pulso (Onda expansiva) */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--accent)] opacity-15 animate-ping-slow" />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-7 w-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="h-8 w-8" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notificaci?n (Badge) si est? cerrado */}
        {!isOpen && (
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring-2 ring-[var(--bg)]">
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        )}
      </button>
    </div>
  );
}
