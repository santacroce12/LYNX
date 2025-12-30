import React from "react";

export default function LocationMap() {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60">
      <iframe
        title="Mapa de oficinas LYNX"
        src="https://maps.google.com/maps?q=Av.+Ricardo+Lyon+445,+Providencia,+Región+Metropolitana,+Chile&t=&z=15&ie=UTF8&iwloc=&output=embed"
        className="h-80 w-full grayscale transition duration-300 ease-out hover:grayscale-0 md:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
