"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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
    `w-full rounded-xl border bg-[var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
      hasError ? "border-[var(--accent)]" : "border-[var(--border)]"
    }`;

  const statusClass =
    status.type === "error"
      ? "text-[var(--accent)]"
      : status.type === "success"
        ? "text-[var(--accent-soft)]"
        : "text-[var(--muted)]";

  return (
    <Card className="p-8">
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold">
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
          <label htmlFor="email" className="text-sm font-semibold">
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
          <label htmlFor="message" className="text-sm font-semibold">
            {form.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
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

        <div className="flex items-center justify-between gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? form.submittingLabel : form.submitLabel}
          </Button>
          <p className={`text-xs ${statusClass}`} aria-live="polite">
            {status.message}
          </p>
        </div>
      </form>
    </Card>
  );
}
