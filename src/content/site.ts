export const site = {
  name: "LYNX",
  company: {
    legalName: "LYNX SpA",
    group: "Grupo Oeste",
  },
  tagline: "Energía y Tecnología para soluciones modernas",
  description:
    "LYNX integra energía e innovación tecnológica para acelerar operaciones críticas con foco en performance y confiabilidad.",
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Energía", href: "/energia" },
    { label: "Tecnología", href: "/tecnologia" },
    { label: "Recursos", href: "/recursos" },
    { label: "Contacto", href: "/contacto" },
  ],
  aria: {
    primaryNav: "Navegación principal",
  },
  theme: {
    toggleLabel: "Modo",
    light: "Claro",
    dark: "Oscuro",
  },
  contact: {
    email: "soporte@lynx.cl",
    mobile: "+56 9 6214 8623",
    phone: "+56 9 XXXX XXXX",
    address: "Santiago, Chile",
    region: "Operación en Chile y Argentina",
    social: [
      { label: "LinkedIn", href: "https://linkedin.com/company/lynxenergia" },
    ],
  },
  footer: {
    navTitle: "Navegación",
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados.",
  },
  homeHero: {
    badge: "Soluciones integradas",
    description:
      "Unimos ingeniería energética y tecnología aplicada para desplegar soluciones premium con impacto medible.",
  },
  homeCards: [
    {
      label: "Energía",
      title: "Infraestructura resiliente",
      description:
        "Optimización de consumo, continuidad operativa y control en tiempo real.",
      cta: "Explorar Energía",
      href: "/energia",
      image: "/images/energia/electrico.jpg",
    },
    {
      label: "Tecnología",
      title: "Plataformas inteligentes",
      description:
        "Apps, automatización e integraciones seguras para decisiones rápidas.",
      cta: "Explorar Tecnología",
      href: "/tecnologia",
      image: "/images/tecnologia/tecnologico.jpg",
    },
  ],
  about: {
    title: "Nosotros",
    subtitle: "LYNX SpA",
    cover: {
      image: "/images/brand/about.svg",
      alt: "Equipo LYNX en operaciones de energía",
    },
    highlightsTitle: "Nuestra Esencia",
    highlights: [
      {
        title: "Trayectoria y Alcance",
        description:
          "Desde 1993, integramos tecnologías de automatización con implementaciones exitosas en Argentina y el exterior.",
        icon: "clock",
      },
      {
        title: "Foco en Energía",
        description:
          "Especialistas en control, medición y protección de sistemas eléctricos con tecnología de vanguardia.",
        icon: "zap",
      },
      {
        title: "Soluciones Integrales",
        description:
          "Combinamos innovación, ingeniería y provisión de equipamiento para superar los resultados esperados.",
        icon: "layers",
      },
      {
        title: "Ciclo de Proyecto 360°",
        description:
          "Acompañamos de punta a punta: desde la ingeniería conceptual hasta el montaje, pruebas y puesta en servicio.",
        icon: "activity",
      },
      {
        title: "Partners Globales",
        description:
          "Trabajamos con socios estratégicos cuyo respaldo tecnológico fortalece la calidad de nuestras soluciones.",
        icon: "globe",
      },
      {
        title: "Equipo Experto",
        description:
          "Profesionales con sólida formación en automatismos avanzados para asumir desafíos con confianza y solidez.",
        icon: "shield",
      },
    ],
  },
  partners: {
    title: "Nuestros aliados tecnológicos",
    subtitle:
      "Trabajamos con fabricantes globales y software especializado para entregar soluciones robustas y seguras.",
    items: [
      {
        name: "SEL",
        href: "https://selinc.com",
        description:
          "Schweitzer Engineering Laboratories. Líderes en protección, automatización y control.",
        image: "/images/partners/SEL.jpeg",
      },
      {
        name: "Survalent",
        href: "https://www.survalent.com/",
        description:
          "Survalent Technology. SCADA avanzado para energía, minería, agua y distribución.",
        image: "/images/partners/survalent.png",
      },
      {
        name: "Systems With Intelligence",
        href: "https://systemswithintelligence.com",
        description:
          "Monitoreo y vigilancia para activos críticos en tiempo real.",
        image: "/images/partners/SWI.jpg",
      },
      {
        name: "N3uron",
        href: "https://n3uron.com",
        description: "Conectividad industrial IoT y gestión de datos.",
        image: "/images/partners/n3uron.svg",
      },
      {
        name: "Cisco",
        href: "https://www.cisco.com/",
        description: "Infraestructura y networking empresarial.",
        image: "/images/partners/logo-open-graph.avif",
      },
      {
        name: "Sisco",
        href: "https://sisconet.com/",
        description: "Integraciones y conectividad industrial.",
        image: "/images/partners/sisco-logo-color.svg",
      },
    ],
  },
  experience: {
    title: "Portafolio de proyectos",
    subtitle:
      "Resultados comprobados en energía, protección y automatización de activos críticos.",
    cases: [
      {
        client: "Cooperativa Eléctrica de Godoy Cruz (Mendoza)",
        work: "Ingeniería de detalle de tableros de control.",
        scope: "Supervisión y comando de interruptores en playa de 132 kV.",
      },
      {
        client: "Hidroeléctrica Nihuiles S.A.",
        work: "Ingeniería de sistema de protección.",
        scope:
          "Paneles para el conjunto Generador-Transformador (1 al 6) y protección de líneas de transmisión.",
      },
    ],
  },
  homeSection: {
    title: "¿Qué hace LYNX?",
    subtitle:
      "Activamos proyectos con foco en eficiencia, continuidad y crecimiento sostenible.",
  },
  homeBullets: [
    {
      title: "Diagnóstico experto",
      icon: "search",
      description: "Levantamos requisitos críticos y un plan claro en semanas.",
    },
    {
      title: "Ejecución integral",
      icon: "monitor",
      description: "Integramos energía, software e infraestructura sin fricciones.",
    },
    {
      title: "Escalabilidad real",
      icon: "ladder",
      description: "Arquitecturas preparadas para crecer sin deuda técnica.",
    },
  ],
  homeCta: {
    title: "¿Listo para despegar con LYNX?",
    text: "Conversemos sobre tu desafío y diseñemos la solución ideal.",
    buttonLabel: "Hablemos",
    href: "/contacto",
  },
  contactPage: {
    title: "Contacto",
    description:
      "Hablemos sobre tu proyecto. Recibimos tu mensaje y respondemos rápido.",
    eyebrow: "Contacto",
    heading: "Hablemos de tu próximo proyecto",
    subtitle:
      "Completa el formulario y nuestro equipo te responde con una propuesta clara.",
    form: {
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      nameErrorRequired: "Ingresa tu nombre.",
      emailLabel: "Email",
      emailPlaceholder: "tu@email.com",
      emailErrorRequired: "Ingresa un email válido.",
      emailErrorAt: "El email debe incluir un @.",
      messageLabel: "Mensaje",
      messagePlaceholder: "Contanos sobre tu proyecto",
      messageErrorMin: "Contanos un poco más (mín. 10 caracteres).",
      submitLabel: "Enviar mensaje",
      submittingLabel: "Enviando...",
      statusError: "Revisa los campos marcados.",
      statusSuccess: "Mensaje listo para enviar. Te respondemos pronto.",
    },
  },
  bot: {
    buttonLabel: "BOT LYNX",
    heading: "Hola, soy Lynx Bot.",
    subheading: "Déjame tus datos y un ingeniero te contactará.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    messageLabel: "Mensaje",
    messagePlaceholder: "Contanos sobre tu proyecto",
    submitLabel: "Enviar solicitud",
    submittingLabel: "Enviando...",
    successMessage: "¡Recibido! Nos pondremos en contacto pronto.",
  },
};
