"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { site } from "@/content/site";

const greeting = "\u00a1Hola! \u{1F44B} Soy el asistente virtual de LYNX. \u00bfCu\u00e1l es tu nombre?";
const askEmail = (name: string) =>
  `Un gusto, ${name}. Para que un ingeniero te contacte, \u00bfme podr\u00edas dar tu correo electr\u00f3nico?`;
const askMessage =
  "\u00a1Gracias! Finalmente, cu\u00e9ntanos brevemente en qu\u00e9 podemos ayudarte hoy.";
const successMessage =
  "\u00a1Perfecto! He enviado tus datos a nuestro equipo. Te escribiremos pronto. \u26a1";
const errorMessage =
  "No pudimos enviar tu solicitud. Por favor, intenta nuevamente.";
const emailError = "El correo no parece v\u00e1lido. Por favor revisa y reintenta.";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

type Step = 0 | 1 | 2 | 3 | 4;

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

export default function BotLynx() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [messages, setMessages] = useState<Message[]>([
    { id: "bot-0", role: "bot", text: greeting },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState(initialForm);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement | null>(null);

  const placeholder = useMemo(() => {
    if (step === 0) return "Escribe tu nombre";
    if (step === 1) return "tu@email.com";
    if (step === 2) return "Escribe tu mensaje";
    return "";
  }, [step]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isTyping]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const replyWithTyping = (text: string, nextStep?: Step) => {
    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
      addMessage({ id: `bot-${Date.now()}`, role: "bot", text });
      if (nextStep !== undefined) {
        setStep(nextStep);
      }
    }, 600);
  };

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed || isTyping || isSending || step >= 3) {
      return;
    }

    addMessage({ id: `user-${Date.now()}`, role: "user", text: trimmed });
    setInputValue("");

    if (step === 0) {
      setFormData((prev) => ({ ...prev, name: trimmed }));
      replyWithTyping(askEmail(trimmed), 1);
      return;
    }

    if (step === 1) {
      if (!validateEmail(trimmed)) {
        replyWithTyping(emailError, 1);
        return;
      }

      setFormData((prev) => ({ ...prev, email: trimmed }));
      replyWithTyping(askMessage, 2);
      return;
    }

    if (step === 2) {
      const nextForm = { ...formData, message: trimmed };
      setFormData(nextForm);
      setStep(3);
      setIsTyping(true);
      setIsSending(true);

      try {
        const response = await fetch("/contact.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nextForm),
        });
        const data = await response.json();

        if (response.ok && data?.success) {
          setIsTyping(false);
          setIsSending(false);
          addMessage({ id: `bot-${Date.now()}`, role: "bot", text: successMessage });
          setStep(4);
        } else {
          setIsTyping(false);
          setIsSending(false);
          addMessage({ id: `bot-${Date.now()}`, role: "bot", text: errorMessage });
          setStep(2);
        }
      } catch (error) {
        setIsTyping(false);
        setIsSending(false);
        addMessage({ id: `bot-${Date.now()}`, role: "bot", text: errorMessage });
        setStep(2);
      }
    }
  };

  const panelMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 12 },
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <m.div
            className="mb-4 w-[min(360px,calc(100vw-3rem))] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/95 shadow-xl backdrop-blur"
            {...panelMotion}
          >
            <div className="border-b border-[var(--border)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--text)]">
                LYNX Bot
              </p>
              <p className="text-xs text-[var(--muted)]">Asistente virtual</p>
            </div>

            <div
              ref={listRef}
              className="max-h-80 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message) => (
                <m.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${{
                    bot: "justify-start",
                    user: "justify-end",
                  }[message.role]}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                      message.role === "bot"
                        ? "bg-slate-100 text-slate-900"
                        : "bg-[var(--accent)] text-[var(--bg)]"
                    }`}
                  >
                    {message.text}
                  </div>
                </m.div>
              ))}

              {isTyping ? (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:0.1s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:0.2s]" />
                    </span>
                  </div>
                </m.div>
              ) : null}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-[var(--border)] px-4 py-3"
            >
              <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className="flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                disabled={step >= 3}
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)] transition-colors hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={step >= 3 || isSending}
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </m.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleOpen}
        aria-label={site.bot.buttonLabel}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--accent)] text-[var(--bg)] shadow-lg transition-transform hover:-translate-y-1"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
