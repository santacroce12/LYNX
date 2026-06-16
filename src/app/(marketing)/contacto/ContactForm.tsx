"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";

const initialValues = {
  name: "",
  email: "",
  company: "",
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
    `field-shell px-4 py-3.5 text-base text-[var(--text-secondary)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:ring-2 ${
      hasError
        ? "border-[var(--accent)] focus:ring-[var(--accent)]"
        : "focus:border-[rgba(89,89,201,0.32)] focus:ring-[rgba(89,89,201,0.22)]"
    }`;

  const statusClass =
    status.type === "error"
      ? "text-[var(--accent)]"
      : status.type === "success"
        ? "text-[var(--accent-soft)]"
        : "text-[var(--muted)]";

  return (
    <div className="panel-shell flex h-full min-h-[680px] flex-col overflow-hidden rounded-[2rem] px-5 py-6 md:px-8 md:py-8 lg:min-h-[720px]">
      <div className="panel-decoration pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-[var(--accent-cool)]/10 blur-3xl" />
      <div className="panel-decoration pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(89,89,201,0.36)] to-transparent" />

      <div className="max-w-md border-b border-white/8 pb-6">
        <p className="section-kicker text-[var(--accent-cool)]">Formulario</p>
        <h2 className="mt-4 text-[1.8rem] font-semibold leading-[1.02] text-[var(--text-strong)] md:text-[2.35rem]">
          Contanos que necesitas.
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)] md:text-[0.98rem]">
          Dejanos el contexto y te respondemos con un siguiente paso claro.
        </p>
      </div>

      <form className="mt-8 flex flex-1 flex-col" onSubmit={handleSubmit} noValidate>
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-[var(--text)]/82">
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
            <label htmlFor="email" className="text-sm font-medium text-[var(--text)]/82">
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
            <label htmlFor="company" className="text-sm font-medium text-[var(--text)]/82">
              {form.companyLabel}
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder={form.companyPlaceholder}
              value={values.company}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, company: event.target.value }))
              }
              className={fieldClass()}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-[var(--text)]/82">
              {form.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={7}
              placeholder={form.messagePlaceholder}
              value={values.message}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, message: event.target.value }))
              }
              className={`${fieldClass(!!errors.message)} min-h-[178px] resize-y`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message ? (
              <p id="message-error" className="text-xs text-[var(--accent)]">
                {errors.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6">
          <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
            {isSubmitting ? form.submittingLabel : form.submitLabel}
          </Button>
          <p className={`text-xs ${statusClass}`} aria-live="polite">
            {status.message}
          </p>
        </div>
      </form>
    </div>
  );
}
