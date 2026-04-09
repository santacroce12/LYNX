"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

type Status = {
  type: "idle" | "error" | "success";
  message?: string;
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = site.contactPage.form;

  const validate = () => {
    const nextErrors: Errors = {};

    if (!values.name.trim()) {
      nextErrors.name = form.nameErrorRequired;
    }

    if (!values.email.trim()) {
      nextErrors.email = form.emailErrorRequired;
    } else if (!values.email.includes("@")) {
      nextErrors.email = form.emailErrorAt;
    }

    if (values.message.trim().length < 10) {
      nextErrors.message = form.messageErrorMin;
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: "error", message: form.statusError });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle" });

    await new Promise((resolve) => setTimeout(resolve, 400));

    setIsSubmitting(false);
    setValues(initialValues);
    setStatus({
      type: "success",
      message: form.statusSuccess,
    });
  };

  const fieldClass = (hasError?: boolean) =>
    `field-shell px-4 py-3.5 text-base text-[var(--text-secondary)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
      hasError ? "border-[var(--accent)]" : ""
    }`;

  const statusClass =
    status.type === "error"
      ? "text-[var(--accent)]"
      : status.type === "success"
        ? "text-[var(--accent-soft)]"
        : "text-[var(--muted)]";

  return (
    <div className="panel-shell overflow-hidden rounded-[2rem] p-5 md:p-6">
      <div className="panel-decoration pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-[var(--accent-cool)]/10 blur-3xl" />

      <div className="mb-6 rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,17,30,0.76)_0%,rgba(8,13,23,0.92)_100%)] p-4 md:p-5">
        <p className="section-kicker">Formulario</p>
        <h2 className="mt-4 text-3xl font-semibold leading-[0.96] text-[var(--text-strong)] md:text-[3rem]">
          Contanos qué necesitás.
        </h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted-soft)]"
          >
            {form.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={form.namePlaceholder}
            value={values.name}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
            className={fieldClass(!!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p id="name-error" className="text-xs text-[var(--accent)]">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted-soft)]"
          >
            {form.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={form.emailPlaceholder}
            value={values.email}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            className={fieldClass(!!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="text-xs text-[var(--accent)]">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted-soft)]"
          >
            {form.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder={form.messagePlaceholder}
            value={values.message}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, message: event.target.value }))
            }
            className={fieldClass(!!errors.message)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message ? (
            <p id="message-error" className="text-xs text-[var(--accent)]">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 pt-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? form.submittingLabel : form.submitLabel}
            </Button>
            <p className={`text-xs ${statusClass}`} aria-live="polite">
              {status.message}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
