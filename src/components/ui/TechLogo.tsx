"use client";

import {
  SiAmazon,
  SiDocker,
  SiKubernetes,
  SiPython,
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiPostgresql,
  SiMqtt,
  SiIeee,
  SiIso,
} from "react-icons/si";
import { LucideIcon, ShieldCheck, Zap, Radio, Network } from "lucide-react";

type IconType = LucideIcon | typeof SiAmazon;

const logoMap: Record<string, IconType> = {
  "AWS Cloud": SiAmazon,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Python: SiPython,
  "Node.js": SiNodedotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  PostgreSQL: SiPostgresql,
  MQTT: SiMqtt,
  "REST API": Network,
  "IEC 61850": Zap,
  "IEEE C37": SiIeee,
  "NFPA 70E": ShieldCheck,
  "ISO 9001": SiIso,
  DNP3: Radio,
  "Modbus TCP": Network,
};

interface TechLogoProps {
  name: string;
  className?: string;
}

export default function TechLogo({
  name,
  className = "h-6 w-6",
}: TechLogoProps) {
  const IconComponent = logoMap[name] || ShieldCheck;
  return <IconComponent className={`text-[var(--accent)] ${className}`} />;
}
