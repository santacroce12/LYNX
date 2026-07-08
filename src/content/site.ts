export const site = {
  name: "LYNX",
  company: {
    legalName: "LYNX",
    group: "Grupo Oeste",
  },
  tagline: "Ingeniería para lo crítico.",
  description:
    "LYNX integra energía, tecnología y soporte para operaciones críticas.",
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Energía", href: "/energia" },
    { label: "Tecnología", href: "/tecnologia" },
    { label: "Partners", href: "/partners" },
    { label: "Recursos", href: "/recursos" },
    { label: "FAQs", href: "/faqs" },
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
    mobile: "+56 9 9219 1328",
    phone: "+56 9 9216 2573",
    address: "Antonio Varas 91, Providencia",
    region: "Operación en Chile y Argentina",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Antonio%20Varas%2091%2C%20Providencia%2C%20Region%20Metropolitana%2C%20Chile",
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
    badge: "Operaciones críticas",
    title: "Ingeniería para lo crítico.",
    description:
      "Integramos, desplegamos y mantenemos sistemas críticos.",
    signals: [
      { label: "Cobertura", value: "Chile y Argentina" },
      { label: "Despliegue", value: "Remoto y en terreno" },
      { label: "Modelo", value: "Diagnóstico, ejecución y soporte" },
    ],
  },
  homeCards: [
    {
      label: "Vertical energía",
      title: "Energía",
      headline: "Automatización y control eléctrico",
      description:
        "SCADA, PMU, protecciones, commissioning y monitoreo para infraestructura crítica.",
      highlights: ["SCADA", "PMU", "Subestaciones"],
      tone: "energy",
      href: "/energia",
      image: "/images/energia/electrico.optimized.webp",
    },
    {
      label: "Vertical tecnología",
      title: "Tecnología",
      headline: "Integración operativa y datos",
      description:
        "OT/IT, IoT industrial, automatización, datos y soporte para conectar procesos y equipos.",
      highlights: ["OT / IT", "IoT", "Datos"],
      tone: "tech",
      href: "/tecnologia",
      image: "/images/tecnologia/tecnologico.optimized.webp",
    },
  ],
  about: {
    title: "Nosotros",
    subtitle: "LYNX",
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
      "Tecnología global, integrada por LYNX para responder a operaciones críticas en energía e industria.",
    items: [
      {
        name: "SEL",
        href: "https://selinc.com",
        role: "Protección y automatización eléctrica",
        description:
          "Schweitzer Engineering Laboratories desarrolla sistemas de protección, automatización, control y comunicaciones para infraestructura eléctrica.",
        contribution:
          "Aporta relés, automatización y concentración de datos para proteger activos, controlar bahías y elevar la confiabilidad de subestaciones y sistemas de potencia.",
        capabilities: ["Protecciones", "Control de bahía", "WAMS / PDC"],
        image: "/images/partners/sel-transparent.png",
      },
      {
        name: "Survalent",
        href: "https://www.survalent.com/",
        role: "SCADA y gestión avanzada de redes",
        description:
          "Survalent desarrolla plataformas SCADA, OMS y DMS para supervisar y operar redes eléctricas e infraestructura distribuida en tiempo real.",
        contribution:
          "Proporciona el núcleo operacional para centros de control, unificando telemetría, alarmas, maniobras y evolución hacia arquitecturas ADMS.",
        capabilities: ["SCADA", "ADMS", "Centro de control"],
        image: "/images/partners/survalent.png",
      },
      {
        name: "Systems With Intelligence",
        href: "https://systemswithintelligence.com",
        role: "Monitoreo de condición",
        description:
          "Systems With Intelligence desarrolla monitoreo térmico y visual continuo para subestaciones, instalaciones remotas y activos críticos.",
        contribution:
          "Suma detección temprana de anomalías y evidencia visual para anticipar fallas, reducir inspecciones de riesgo y habilitar mantenimiento basado en condición.",
        capabilities: ["Termografía", "Visión remota", "Mantenimiento predictivo"],
        image: "/images/partners/swi-transparent.png",
        focusImage: "/images/partners/SWI.jpg",
        focusImageFit: "cover" as const,
      },
      {
        name: "N3uron",
        href: "https://n3uron.com",
        role: "IIoT y datos industriales",
        description:
          "N3uron es una plataforma modular de IIoT y DataOps para conectar, contextualizar, historizar y visualizar información industrial.",
        contribution:
          "Aporta la capa Edge que conecta OT e IT, normaliza múltiples protocolos y convierte datos de campo en información disponible para operar y decidir.",
        capabilities: ["Edge", "OT / IT", "DataOps"],
        image: "/images/partners/n3uron.svg",
      },
      {
        name: "LEXA",
        href: "https://www.lexa.global/",
        role: "Riesgo y cumplimiento",
        description:
          "LEXA integra gestión de riesgos, activos, amenazas, controles y evidencias en una plataforma GRC/RiskOps con trazabilidad continua.",
        contribution:
          "Transforma hallazgos técnicos en planes de acción, responsables y reportes ejecutivos, sumando gobierno y cumplimiento a la propuesta de ciberseguridad de LYNX.",
        capabilities: ["GRC / RiskOps", "Cumplimiento", "Trazabilidad"],
        image: "/images/partners/lexa-transparent.png",
      },
      {
        name: "Cisco",
        href: "https://www.cisco.com/",
        role: "Redes industriales y seguridad OT",
        description:
          "Cisco proporciona switching, routing, visibilidad y seguridad para conectar activos industriales, sedes y centros de operación.",
        contribution:
          "Proporciona la infraestructura robusta sobre la que LYNX segmenta, protege y opera comunicaciones entre IED, PLC, RTU, servidores y plataformas corporativas.",
        capabilities: ["Networking OT", "Segmentación", "Acceso seguro"],
        image: "/images/partners/cisco-transparent.png",
      },
      {
        name: "SISCO",
        href: "https://sisconet.com/",
        role: "Interoperabilidad eléctrica",
        description:
          "SISCO se especializa en comunicaciones en tiempo real e integración de sistemas eléctricos mediante estándares abiertos.",
        contribution:
          "Reduce el riesgo de integración entre IED, SCADA, EMS y centros de control con herramientas para IEC 61850, ICCP/TASE.2, CIM y OPC.",
        capabilities: ["IEC 61850", "ICCP / TASE.2", "CIM / OPC"],
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
      "Diagnóstico, ejecución y soporte para energía e infraestructura tecnológica.",
  },
  homeBullets: [
    {
      title: "Diagnóstico experto",
      icon: "search",
      description: "Relevamos requisitos y priorizamos el plan de acción.",
    },
    {
      title: "Ejecución integral",
      icon: "monitor",
      description: "Coordinamos ingeniería, software e infraestructura.",
    },
    {
      title: "Escalabilidad real",
      icon: "ladder",
      description: "Diseñamos soluciones mantenibles y preparadas para crecer.",
    },
  ],
  homeCta: {
    title: "Hablemos de tu operación",
    text: "Contanos qué necesitás resolver y armamos el próximo paso.",
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
      nameLabel: "Nombre completo",
      namePlaceholder: "Tu nombre",
      nameErrorRequired: "Ingresa tu nombre.",
      emailLabel: "Email",
      emailPlaceholder: "tu@email.com",
      emailErrorRequired: "Ingresa un email válido.",
      emailErrorAt: "El email debe incluir un @.",
      companyLabel: "Empresa",
      companyPlaceholder: "Tu empresa",
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
