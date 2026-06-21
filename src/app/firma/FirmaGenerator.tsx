"use client";

import Image from "next/image";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Check,
  Clipboard,
  Link2,
  Mail,
  Moon,
  Phone,
  Sparkles,
  Sun,
  UserRound,
} from "lucide-react";
import Button from "@/components/ui/Button";

type SignatureVariant = "dark" | "light";

type SignatureFields = {
  name: string;
  role: string;
  phone: string;
  email: string;
  linkedin: string;
  instagram: string;
  youtube: string;
};

type Status = {
  tone: "idle" | "success" | "error";
  message: string;
};

type FieldDefinition = {
  key: keyof Pick<SignatureFields, "name" | "role" | "phone" | "email">;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  inputMode?: "email" | "tel";
};

const initialFields: SignatureFields = {
  name: "Nombre Nombre Apellido",
  role: "Cargo",
  phone: "+56 9 9216 2573",
  email: "nombre@lynx.cl",
  linkedin: "https://linkedin.com/company/lynxenergia",
  instagram: "https://instagram.com/lynxenergia",
  youtube: "https://youtube.com/@lynxenergia",
};

const fieldDefinitions: FieldDefinition[] = [
  {
    key: "name",
    label: "Nombre y apellido",
    placeholder: "Nombre Nombre Apellido",
    icon: UserRound,
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
    placeholder: "nombre@lynx.cl",
    icon: Mail,
    inputMode: "email",
  },
  {
    key: "phone",
    label: "Teléfono",
    placeholder: "+56 9 0000 0000",
    icon: Phone,
    inputMode: "tel",
  },
];

const socialDefinitions = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
] as const;

const fixedWebsite = "lynx.cl";
const productionAssetOrigin = "https://lynx-henna.vercel.app";

const signaturePanels: Record<SignatureVariant, string> = {
  dark: "/images/signature/panel-dark.png",
  light: "/images/signature/panel-light.png",
};

const socialIcons = {
  linkedin: "/images/signature/linkedin.png",
  instagram: "/images/signature/instagram.png",
  youtube: "/images/signature/youtube.png",
} as const;

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
  return value.trim().replace(/[^\d+]/g, "");
}

function getAbsoluteAssetUrl(path: string) {
  if (typeof window === "undefined") {
    return new URL(path, productionAssetOrigin).toString();
  }

  const currentOrigin = new URL(window.location.origin);
  const isLocalOrigin = ["localhost", "127.0.0.1", "[::1]"].includes(currentOrigin.hostname);
  const assetOrigin = isLocalOrigin ? productionAssetOrigin : currentOrigin.origin;

  return new URL(path, assetOrigin).toString();
}

function buildSocialCell(
  label: string,
  href: string,
  iconUrl: string,
  isLast: boolean,
) {
  const trimmedHref = href.trim();
  if (!trimmedHref) return "";

  return `
    <td style="padding:0 ${isLast ? "0" : "8px"} 0 0; vertical-align:middle;">
      <a href="${escapeHtml(normalizeWebsite(trimmedHref))}" target="_blank" style="display:block; text-decoration:none;">
        <img src="${escapeHtml(iconUrl)}" alt="${escapeHtml(label)}" width="32" height="32" style="display:block; width:32px; height:32px; border:0;" />
      </a>
    </td>
  `;
}

function buildSignatureHtml(
  fields: SignatureFields,
  variant: SignatureVariant,
  assetUrl: (path: string) => string,
) {
  const availableSocials = socialDefinitions.filter(({ key }) => fields[key].trim());
  const socialCells = availableSocials
    .map(({ key, label }, index) =>
      buildSocialCell(
        label,
        fields[key],
        assetUrl(socialIcons[key]),
        index === availableSocials.length - 1,
      ),
    )
    .join("");

  const name = fields.name.trim() || initialFields.name;
  const role = fields.role.trim() || initialFields.role;
  const email = fields.email.trim() || initialFields.email;
  const phone = fields.phone.trim() || initialFields.phone;

  return `
<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="600" style="border-collapse:collapse; table-layout:fixed; width:600px; max-width:600px; background:#ffffff;">
  <tr>
    <td width="226" height="200" style="padding:0; width:226px; height:200px; vertical-align:top; font-size:0; line-height:0;">
      <a href="${escapeHtml(normalizeWebsite(fixedWebsite))}" target="_blank" style="display:block; text-decoration:none;">
        <img src="${escapeHtml(assetUrl(signaturePanels[variant]))}" alt="LYNX" width="226" height="200" style="display:block; width:226px; height:200px; border:0;" />
      </a>
    </td>
    <td width="374" height="200" bgcolor="#ffffff" style="padding:23px 48px 13px 42px; width:374px; height:200px; vertical-align:top; background:#ffffff; font-family:Arial, Helvetica, sans-serif; color:#0d0625;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse:collapse; width:100%;">
        <tr>
          <td style="padding:0; font-family:Arial, Helvetica, sans-serif; font-size:20px; line-height:25px; font-weight:400; color:#0d0625; white-space:nowrap;">
            ${escapeHtml(name)}
          </td>
        </tr>
        <tr>
          <td style="padding:1px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:20px; font-weight:400; text-transform:uppercase; color:#0d0625;">
            ${escapeHtml(role)}
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:19px; font-weight:700; color:#0d0625;">
            <a href="mailto:${escapeHtml(email)}" style="color:#0d0625; text-decoration:none;">${escapeHtml(email)}</a><br />
            <a href="tel:${escapeHtml(normalizeTel(phone))}" style="color:#0d0625; text-decoration:none;">${escapeHtml(phone)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 0 11px 0;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse:collapse; width:100%;">
              <tr>
                <td height="1" bgcolor="#9b98a6" style="height:1px; padding:0; font-size:0; line-height:0; background:#9b98a6;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
              <tr>${socialCells}</tr>
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
    fields.email.trim(),
    fields.phone.trim(),
    fixedWebsite,
  ]
    .filter(Boolean)
    .join("\n");
}

function fallbackCopyRich(html: string) {
  const container = document.createElement("div");
  container.contentEditable = "true";
  container.innerHTML = html;
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  document.body.appendChild(container);

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(container);
  selection?.removeAllRanges();
  selection?.addRange(range);
  const success = document.execCommand("copy");
  selection?.removeAllRanges();
  document.body.removeChild(container);
  return success;
}

function selectPreviewForManualCopy() {
  const preview = document.querySelector<HTMLElement>("[data-signature-preview]");
  const selection = window.getSelection();

  if (!preview || !selection) return false;

  const range = document.createRange();
  range.selectNodeContents(preview);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}

export default function FirmaGenerator() {
  const [fields, setFields] = useState(initialFields);
  const [variant, setVariant] = useState<SignatureVariant>("dark");
  const [status, setStatus] = useState<Status>(defaultStatus);

  const previewHtml = buildSignatureHtml(fields, variant, (path) => path);
  const exportHtml = buildSignatureHtml(fields, variant, getAbsoluteAssetUrl);
  const plainText = buildPlainText(fields);

  const statusClass =
    status.tone === "error"
      ? "text-[var(--accent-warm)]"
      : status.tone === "success"
        ? "text-[var(--accent-soft)]"
        : "text-[var(--muted)]";

  const resetStatus = () => {
    if (status.tone !== "idle") setStatus(defaultStatus);
  };

  const handleChange = (key: keyof SignatureFields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    resetStatus();
  };

  const handleVariantChange = (nextVariant: SignatureVariant) => {
    setVariant(nextVariant);
    resetStatus();
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
      if (fallbackCopyRich(exportHtml)) {
        setStatus({ tone: "success", message: "Firma copiada correctamente." });
        return;
      }

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(plainText);
          setStatus({
            tone: "success",
            message: "Se copió una versión de texto por restricciones del navegador.",
          });
          return;
        }
      } catch {
        // Continúa con la selección manual si el navegador bloquea el portapapeles.
      }

      if (selectPreviewForManualCopy()) {
        setStatus({
          tone: "error",
          message: "El navegador bloqueó el copiado. La firma quedó seleccionada: presioná Ctrl+C.",
        });
        return;
      }

      setStatus({ tone: "error", message: "No se pudo seleccionar la firma." });
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 md:py-7 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(239,130,57,0.09),transparent_22%),radial-gradient(circle_at_86%_10%,rgba(89,89,201,0.18),transparent_25%),linear-gradient(135deg,rgba(23,16,75,0.22)_0%,transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-5 md:gap-6">
        <header className="flex flex-col gap-5 rounded-[1.8rem] border border-white/8 bg-[rgba(15,8,42,0.72)] px-5 py-5 shadow-[0_24px_80px_rgba(3,8,20,0.2)] backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-7">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex h-14 w-32 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4">
              <Image
                src="/images/brand/lynx-logo-negative.png"
                alt="LYNX"
                width={180}
                height={54}
                priority
                className="h-auto w-full"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-soft)]">
                Herramienta interna
              </p>
              <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-[-0.035em] text-[var(--text-strong)] md:text-3xl">
                Generador de firma
              </h1>
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--muted)] md:text-right">
            Completa los datos, elegí el estilo y copiá una firma compatible con Outlook.
          </p>
        </header>

        <section className="grid gap-5 xl:grid-cols-[minmax(320px,390px)_minmax(0,1fr)]">
          <div className="panel-shell overflow-hidden rounded-[1.8rem] px-5 py-6 md:px-6 md:py-7">
            <div className="flex items-center gap-3 border-b border-white/8 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--accent-soft)]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
                  Paso 01
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[var(--text-strong)]">
                  Datos del colaborador
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {fieldDefinitions.map((field) => {
                const Icon = field.icon;

                return (
                  <label key={field.key} className="block space-y-2">
                    <span className="flex items-center gap-2 text-xs font-semibold text-[var(--text)]/82">
                      <Icon className="h-3.5 w-3.5 text-[var(--accent-cool)]" aria-hidden="true" />
                      {field.label}
                    </span>
                    <input
                      type={field.inputMode === "email" ? "email" : field.inputMode === "tel" ? "tel" : "text"}
                      value={fields[field.key]}
                      onChange={(event) => handleChange(field.key, event.target.value)}
                      placeholder={field.placeholder}
                      className="field-shell px-4 py-3 text-sm text-[var(--text-secondary)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:ring-2 focus:ring-[rgba(89,89,201,0.26)]"
                    />
                  </label>
                );
              })}
            </div>

            <details className="group mt-5 rounded-[1.2rem] border border-white/8 bg-white/[0.025] p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-[var(--text)]/82">
                <span className="flex items-center gap-2">
                  <Link2 className="h-3.5 w-3.5 text-[var(--accent-cool)]" aria-hidden="true" />
                  Enlaces sociales
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted-soft)] group-open:hidden">
                  Editar
                </span>
              </summary>
              <div className="mt-4 space-y-3 border-t border-white/8 pt-4">
                {socialDefinitions.map((social) => (
                  <label key={social.key} className="block space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted-soft)]">
                      {social.label}
                    </span>
                    <input
                      type="url"
                      value={fields[social.key]}
                      onChange={(event) => handleChange(social.key, event.target.value)}
                      className="field-shell px-3 py-2.5 text-xs text-[var(--text-secondary)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:ring-2 focus:ring-[rgba(89,89,201,0.26)]"
                    />
                  </label>
                ))}
              </div>
            </details>
          </div>

          <div className="panel-shell overflow-hidden rounded-[1.8rem] px-5 py-6 md:px-6 md:py-7">
            <div className="flex flex-col gap-5 border-b border-white/8 pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
                  Paso 02
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[var(--text-strong)]">
                  Elegí el estilo
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-[1.15rem] border border-white/10 bg-black/15 p-1.5" role="group" aria-label="Estilo de firma">
                {([
                  { value: "dark" as const, label: "Oscura", icon: Moon },
                  { value: "light" as const, label: "Clara", icon: Sun },
                ]).map((option) => {
                  const Icon = option.icon;
                  const isActive = variant === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleVariantChange(option.value)}
                      aria-pressed={isActive}
                      className={`inline-flex min-w-[118px] items-center justify-center gap-2 rounded-[0.9rem] px-4 py-2.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cool)] ${
                        isActive
                          ? "bg-[linear-gradient(135deg,var(--accent),var(--accent-cool))] text-white shadow-[0_10px_28px_rgba(89,89,201,0.24)]"
                          : "text-[var(--muted)] hover:bg-white/[0.05] hover:text-[var(--text-strong)]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {option.label}
                      {isActive && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-[#d9d9e2] p-4 shadow-[0_26px_80px_rgba(3,8,20,0.22)] md:p-6">
              <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#262039]/55">
                <span>Vista previa</span>
                <span>600 × 200 px</span>
              </div>
              <div className="overflow-x-auto rounded-sm bg-white shadow-[0_16px_46px_rgba(13,6,37,0.2)]">
                <div
                  className="min-w-[600px]"
                  data-signature-preview
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className={`text-sm ${statusClass}`} aria-live="polite">
                {status.message}
              </p>
              <Button type="button" size="lg" onClick={handleCopyRich} className="sm:min-w-[180px]">
                <Clipboard className="h-4 w-4" />
                Copiar firma
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
