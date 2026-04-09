"use client";

import { useEffect, useState, type ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (reduceMotion || !isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: Math.min(y, 14) }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.46, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
