"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BotMessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function BotLynx() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el asistente virtual de LYNX. ¿En qué puedo ayudarte con nuestros servicios de Energía o Tecnología?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/chat.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (!response.ok) throw new Error("Error de red");

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botResponse = data.response || "Lo siento, no pude procesar eso.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botResponse },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Estoy teniendo problemas de conexión. Por favor intenta más tarde o contáctanos por email.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-[400px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl sm:right-6"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                  <BotMessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)]">
                    Asistente LYNX
                  </h3>
                  <p className="text-xs text-[var(--muted)]">En l?nea ahora</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-[var(--muted)] hover:bg-[var(--border)] hover:text-[var(--text)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-80 overflow-y-auto bg-[var(--bg-subtle)] p-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                  <BotMessageSquare className="h-5 w-5" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-[var(--surface)] p-3 text-sm shadow-sm">
                  <p>
                    ?Hola! Soy el asistente virtual de LYNX SpA. ?En qu? puedo
                    ayudarte hoy con tus proyectos de energ?a y automatizaci?n?
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] bg-[var(--surface)] p-4">
              <form className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribe tu consulta..."
                  className="flex-1 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform hover:scale-105 hover:bg-[var(--accent-dark)]"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 h-14 w-14">
        <div className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-25 duration-1000"></div>
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex h-full w-full items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-xl shadow-[var(--accent)]/30 transition-transform duration-300 hover:scale-110 hover:bg-[var(--accent-dark)]"
          aria-label="Abrir chat"
        >
          <BotMessageSquare className="h-7 w-7 animate-pulse" />
        </button>
      </div>
    </>
  );
}
