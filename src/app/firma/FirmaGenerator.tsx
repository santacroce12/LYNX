"use client";

import Image from "next/image";
import { useState } from "react";
import { BriefcaseBusiness, Clipboard, Mail, Phone, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";

type SignatureFields = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

type Status = {
  tone: "idle" | "success" | "error";
  message: string;
};

const initialFields: SignatureFields = {
  name: "Nombre Apellido",
  role: "Cargo",
  phone: "+56 ",
  email: "correo@empresa.com",
};

const fixedWebsite = "lynx.cl";
const fixedAddress = "Antonio Varas 91, Providencia, Chile";
const signatureLogoPath = "/images/brand/lynx-logo-positive.png";
const productionLogoOrigin = "https://lynx-henna.vercel.app";

const defaultStatus: Status = {
  tone: "idle",
  message: "Completa los datos y copia la firma.",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function normalizeTel(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  return trimmed.replace(/[^\d+]/g, "");
}

function buildMapsUrl(value: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
}

function buildRow(label: string, value: string, href?: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:#0d0625; text-decoration:none;">${escapeHtml(trimmed)}</a>`
    : escapeHtml(trimmed);

  return `
    <tr>
      <td style="padding:0 8px 6px 0; vertical-align:top; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; font-weight:700; color:#5959c9; white-space:nowrap;">
        ${escapeHtml(label)}:
      </td>
      <td style="padding:0 0 6px 0; vertical-align:top; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#0d0625;">
        ${content}
      </td>
    </tr>
  `;
}

function buildSignatureHtml(fields: SignatureFields, logoUrl: string) {
  const rows = [
    buildRow("T", fields.phone, normalizeTel(fields.phone) ? `tel:${normalizeTel(fields.phone)}` : undefined),
    buildRow("E", fields.email, fields.email.trim() ? `mailto:${fields.email.trim()}` : undefined),
    buildRow("W", fixedWebsite, normalizeWebsite(fixedWebsite)),
    buildRow("A", fixedAddress, buildMapsUrl(fixedAddress)),
  ]
    .filter(Boolean)
    .join("");

  return `
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse; width:100%; max-width:640px;">
  <tr>
    <td style="padding:0; vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
        <tr>
          <td style="padding:0; vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
              <tr>
                <td style="padding:0;">
                  <img
                    src="${escapeHtml(logoUrl)}"
                    alt="LYNX"
                    width="146"
                    style="display:block; width:146px; max-width:146px; height:auto; border:0;"
                  />
                </td>
              </tr>
              <tr>
                <td style="padding:14px 0 0 0; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:11px; line-height:16px; color:#6d6588;">
                  ${escapeHtml(site.tagline)}
                </td>
              </tr>
            </table>
          </td>
          <td style="width:20px; min-width:20px; font-size:0; line-height:0;">&nbsp;</td>
          <td style="padding:0 0 0 20px; border-left:2px solid #5959c9; mso-border-left-alt:solid #5959c9 2px; vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
              <tr>
                <td style="padding:0; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:24px; line-height:28px; font-weight:700; color:#0d0625;">
                  ${escapeHtml(fields.name.trim() || initialFields.name)}
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0 0 0; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:12px; line-height:16px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:#5959c9;">
                  ${escapeHtml(fields.role.trim() || initialFields.role)}
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0 0 0;">
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
                    <tr>
                      <td width="58" bgcolor="#ef8239" style="width:58px; height:2px; font-size:0; line-height:0;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 0 0 0;">
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
                    ${rows}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.trim();
}

function buildPlainText(fields: SignatureFields) {
  return [
    fields.name.trim() || initialFields.name,
    fields.role.trim() || initialFields.role,
    `T: ${fields.phone.trim()}`,
    `E: ${fields.email.trim()}`,
    `W: ${fixedWebsite}`,
    `A: ${fixedAddress}`,
    site.tagline,
  ].join("\n");
}

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const success = document.execCommand("copy");
  document.body.removeChild(textarea);
  return success;
}

function buildAbsoluteLogoUrl() {
  if (typeof window === "undefined") {
    return new URL(signatureLogoPath, productionLogoOrigin).toString();
  }

  const currentOrigin = new URL(window.location.origin);
  const isLocalOrigin = ["localhost", "127.0.0.1", "[::1]"].includes(currentOrigin.hostname);
  const assetOrigin = isLocalOrigin ? productionLogoOrigin : currentOrigin.origin;

  return new URL(signatureLogoPath, assetOrigin).toString();
}

export default function FirmaGenerator() {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState<Status>(defaultStatus);
  const absoluteLogoUrl = buildAbsoluteLogoUrl();

  const previewHtml = buildSignatureHtml(fields, signatureLogoPath);
  const exportHtml = buildSignatureHtml(fields, absoluteLogoUrl);
  const plainText = buildPlainText(fields);

  const statusClass =
    status.tone === "error"
      ? "text-[var(--accent-warm)]"
      : status.tone === "success"
        ? "text-[var(--accent-soft)]"
        : "text-[var(--muted)]";

  const handleChange = (key: keyof SignatureFields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (status.tone !== "idle") {
      setStatus(defaultStatus);
    }
  };

  const handleCopyRich = async () => {
    try {
      if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
        const item = new ClipboardItem({
          "text/html": new Blob([exportHtml], { type: "text/html" }),
          "text/plain": new Blob([plainText], { type: "text/plain" }),
        });
        await navigator.clipboard.write([item]);
        setStatus({ tone: "success", message: "Firma copiada correctamente." });
        return;
      }

      throw new Error("Clipboard API no disponible");
    } catch {
      if (fallbackCopy(exportHtml)) {
        setStatus({ tone: "success", message: "Firma copiada correctamente." });
        return;
      }

      setStatus({ tone: "error", message: "No se pudo copiar la firma." });
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(239,130,57,0.11),transparent_24%),radial-gradient(circle_at_84%_8%,rgba(89,89,201,0.16),transparent_24%),linear-gradient(135deg,rgba(23,16,75,0.25)_0%,transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-6">
        <section className="panel-shell panel-grid overflow-hidden rounded-[2rem] px-5 py-6 md:px-8 md:py-8">
          <div className="panel-decoration pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full bg-[rgba(89,89,201,0.16)] blur-3xl" />

          <div className="relative z-[1] max-w-3xl">
            <div className="inline-flex items-center rounded-[1.25rem] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[0_18px_44px_rgba(3,8,20,0.18)]">
              <Image
                src="/images/brand/lynx-logo-negative.png"
                alt="LYNX"
                width={142}
                height={42}
                priority
                className="h-auto w-[118px] md:w-[142px]"
              />
            </div>

            <h1 className="mt-6 max-w-3xl text-[2.25rem] font-semibold leading-[0.94] text-[var(--text-strong)] md:text-[4.1rem]">
              Generador de firma HTML para Outlook.
            </h1>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-8 text-[var(--text)]/78 md:text-[1.06rem]">
              Completa los datos del colaborador y copia la firma final.
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(320px,390px)_minmax(0,1fr)]">
          <div className="panel-shell overflow-hidden rounded-[2rem] px-5 py-6 md:px-6 md:py-7">
            <div className="border-b border-white/8 pb-5">
              <h2 className="mt-4 text-[1.7rem] leading-[1.02] text-[var(--text-strong)] md:text-[2.15rem]">
                Datos del colaborador.
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  key: "name",
                  label: "Nombre y apellido",
                  placeholder: "Nombre Apellido",
                  icon: Sparkles,
                },
                {
                  key: "role",
                  label: "Cargo",
                  placeholder: "Cargo",
                  icon: BriefcaseBusiness,
                },
                {
                  key: "email",
                  label: "Email",
                  placeholder: "correo@empresa.com",
                  icon: Mail,
                },
                {
                  key: "phone",
                  label: "Telefono",
                  placeholder: "+56 9 0000 0000",
                  icon: Phone,
                },
              ].map((field) => {
                const Icon = field.icon;
                const value = fields[field.key as keyof SignatureFields];

                return (
                  <label key={field.key} className="block space-y-2">
                    <span className="flex items-center gap-2 text-sm font-medium text-[var(--text)]/82">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-[0.9rem] border border-white/10 bg-white/[0.03] text-[var(--accent-soft)]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {field.label}
                    </span>
                    <input
                      type="text"
                      value={value}
                      onChange={(event) =>
                        handleChange(field.key as keyof SignatureFields, event.target.value)
                      }
                      placeholder={field.placeholder}
                      className="field-shell px-4 py-3.5 text-base text-[var(--text-secondary)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:ring-2 focus:ring-[rgba(89,89,201,0.22)]"
                    />
                  </label>
                );
              })}
            </div>

            <p className={`mt-4 text-sm ${statusClass}`} aria-live="polite">
              {status.message}
            </p>
          </div>

          <div className="panel-shell overflow-hidden rounded-[2rem] px-5 py-6 md:px-6 md:py-7">
            <div className="flex items-end justify-between border-b border-white/8 pb-5">
              <h2 className="mt-4 text-[1.65rem] leading-[1.02] text-[var(--text-strong)] md:text-[2.05rem]">
                Vista previa.
              </h2>
              <Button type="button" size="lg" onClick={handleCopyRich}>
                <Clipboard className="h-4 w-4" />
                Copiar firma
              </Button>
            </div>

            <div className="mt-6 overflow-x-auto rounded-[1.7rem] border border-[rgba(13,6,37,0.08)] bg-white p-5 shadow-[0_24px_70px_rgba(3,8,20,0.18)] md:p-7">
              <div
                className="min-w-[540px]"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
