export type RecursoDetalle = {
  title: string;
  items: string[];
};

type RecursoCaso = {
  id: string;
  category: "Energía" | "Tecnología";
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  details: RecursoDetalle[];
  gallery: string[];
};

export const recursos = {
  meta: {
    title: "Recursos",
    description:
      "Casos de éxito y proyectos destacados en energía, automatización y tecnología aplicada.",
  },
  hero: {
    badge: "Recursos",
    title: "Recursos y casos de éxito",
    subtitle:
      "Explorá experiencias reales con impacto medible en operaciones críticas y transformación digital.",
  },
  sections: {
    casesTitle: "Casos de éxito",
    casesSubtitle:
      "Tarjetas con resumen y acceso a la información detallada de cada proyecto.",
    detailTitle: "Detalle del caso",
    galleryTitle: "Más imágenes",
  },
  cases: [
    {
      id: "godoy-cruz",
      category: "Energía",
      title: "Cooperativa Eléctrica de Godoy Cruz",
      subtitle: "Ingeniería de detalle y control en 132 kV",
      summary:
        "Supervisión y comando de interruptores en playa de 132 kV con foco en continuidad operativa.",
      description:
        "Desarrollamos la ingeniería de detalle de tableros de control y la lógica de supervisión para mejorar la visibilidad en tiempo real y reducir tiempos de respuesta ante eventos críticos.",
      image: "/images/energia/energia-subestacion.jpg",
      tags: ["Energía", "Protección", "Alta tensión"],
      details: [
        {
          title: "Desafío",
          items: [
            "Modernizar el control de interruptores sin detener la operación.",
            "Reducir tiempos de diagnóstico en maniobras críticas.",
          ],
        },
        {
          title: "Solución",
          items: [
            "Ingeniería de detalle y documentación técnica completa.",
            "Integración de señalización y lógica de enclavamientos.",
            "Pruebas FAT y soporte en puesta en servicio.",
          ],
        },
        {
          title: "Resultados",
          items: [
            "Mayor visibilidad operativa en tiempo real.",
            "Reducción de riesgos por maniobras manuales.",
            "Operación más segura y confiable.",
          ],
        },
      ],
      gallery: [
        "/images/energia/energia-control.jpg",
        "/images/energia/1.jpg",
        "/images/energia/slide-2.jpg",
      ],
    },
    {
      id: "nihuiles",
      category: "Energía",
      title: "Hidroeléctrica Nihuiles S.A.",
      subtitle: "Sistema de protección para generación y líneas",
      summary:
        "Paneles de protección para el conjunto Generador-Transformador y líneas de transmisión.",
      description:
        "Implementamos el diseño de protecciones para unidades de generación y líneas críticas, asegurando selectividad, confiabilidad y tiempos de respuesta adecuados para operación continua.",
      image: "/images/energia/energia-control.jpg",
      tags: ["Protección", "Generación", "Continuidad"],
      details: [
        {
          title: "Desafío",
          items: [
            "Coordinar protecciones para múltiples unidades de generación.",
            "Garantizar selectividad ante fallas en líneas de transmisión.",
          ],
        },
        {
          title: "Solución",
          items: [
            "Ingeniería de protecciones con estudios de coordinación.",
            "Diseño de paneles y pruebas de lógica de disparo.",
            "Protocolos de puesta en marcha y ensayos en sitio.",
          ],
        },
        {
          title: "Resultados",
          items: [
            "Mayor estabilidad y seguridad operativa.",
            "Tiempos de respuesta optimizados ante contingencias.",
            "Disminución de riesgos para activos críticos.",
          ],
        },
      ],
      gallery: [
        "/images/energia/energia-subestacion.jpg",
        "/images/energia/6.jpg",
        "/images/energia/9.jpg",
      ],
    },
    {
      id: "scada",
      category: "Tecnología",
      title: "Operador regional de distribución",
      subtitle: "Plataforma SCADA e integración IoT",
      summary:
        "Centralización de datos para operación, alarmas y mantenimiento predictivo.",
      description:
        "Creamos una plataforma unificada para visualizar activos, automatizar alarmas y habilitar análisis en tiempo real con integraciones IoT.",
      image: "/images/tecnologia/tecnologia-datacenter.jpg",
      tags: ["SCADA", "IoT", "Automatización"],
      details: [
        {
          title: "Desafío",
          items: [
            "Datos dispersos en múltiples sistemas heredados.",
            "Falta de visibilidad en equipos críticos de campo.",
          ],
        },
        {
          title: "Solución",
          items: [
            "Integración de señales OT/IT con gateway seguro.",
            "Dashboards en tiempo real y reglas de alarma.",
            "Modelo de mantenimiento predictivo por activos.",
          ],
        },
        {
          title: "Resultados",
          items: [
            "Mejoras en tiempos de respuesta y continuidad.",
            "Ahorro en costos operativos y mantenimiento.",
            "Decisiones más rápidas con datos confiables.",
          ],
        },
      ],
      gallery: [
        "/images/tecnologia/tecnologia-abstracto.jpg",
        "/images/tecnologia/tecnologia-robot.jpg",
      ],
    },
  ] as RecursoCaso[],
};
