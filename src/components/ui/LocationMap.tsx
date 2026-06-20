import React from "react";

export default function LocationMap() {
  return (
    <div className="panel-shell overflow-hidden rounded-[2.15rem] p-2 md:p-4">
      <div className="relative overflow-hidden rounded-[1.6rem] border border-[var(--border)]">
        <iframe
          title="Mapa de oficinas LYNX"
          src="https://maps.google.com/maps?q=Antonio+Varas+91,+Providencia,+Region+Metropolitana,+Chile&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="h-80 w-full grayscale-[0.3] contrast-[1.04] saturate-[0.86] md:h-[25rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,6,37,0.08)_0%,rgba(13,6,37,0.24)_100%)]" />
      </div>
    </div>
  );
}
