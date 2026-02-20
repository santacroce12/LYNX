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
    badge: "Casos de Éxito",
    title: "Proyectos Destacados",
    subtitle:
      "Explorá nuestra experiencia real desarrollando soluciones críticas para el sector energético e industrial.",
  },
  sections: {
    casesTitle: "Portafolio de Proyectos",
    casesSubtitle:
      "Conoce en detalle las soluciones implementadas y los resultados obtenidos en cada desafío.",
    detailTitle: "Detalle del proyecto",
    galleryTitle: "Galería del proyecto",
  },
  cases: [
    {
      id: "villa-hipodromo",
      category: "Energía",
      title: "ET Villa Hipódromo",
      subtitle: "Sistema de control de bahía en 132 kV",
      summary:
        "Ingeniería de detalle y sistema de control basado en PLC para dos líneas y dos transformadores de 132/33/13 kV.",
      description:
        "Para la Cooperativa Eléctrica de Godoy Cruz, ejecutamos la ingeniería de detalle de los tableros de control. El proyecto abarcó la interconexión y repetición de señales críticas para garantizar la correcta supervisión y comando de los interruptores y seccionadores en la playa de 132 kV de la Estación Transformadora.",
      image: "/images/recursos/villahipodromo.jpg",
      tags: ["Control", "Alta Tensión", "PLC", "Subestación"],
      details: [
        {
          title: "Alcance del Proyecto",
          items: [
            "Sistema de control de bahía para 2 líneas de 132 kV.",
            "Control para 2 transformadores de 132-33-13 kV.",
            "Supervisión y comando de interruptores y seccionadores de playa.",
          ],
        },
        {
          title: "Solución Implementada",
          items: [
            "Ingeniería de detalle completa para tableros de control.",
            "Diseño de interconexión y lógica de repetición de señales.",
            "Arquitectura de control basada en tecnología PLC.",
          ],
        },
      ],
      gallery: [
        "/images/recursos/villahipodromo.jpg",
      ],
    },
    {
      id: "antena-esa",
      category: "Energía",
      title: "Agencia Espacial Europea (ESA)",
      subtitle: "Planta de energía para Antena de Espacio Profundo (DSG)",
      summary:
        "Consultoría, ingeniería y provisión llave en mano del sistema eléctrico y control de alimentación asegurada.",
      description:
        "Desarrollamos una solución integral para asegurar la alimentación ininterrumpida de la antena DSG. El sistema principal cuenta con 2 transformadores secos de 1 MVA, respaldados por 3 grupos electrógenos de 800 kVA. La alimentación asegurada se garantiza mediante un robusto sistema de barras UPS de 220 kVA y 80 kVA.",
      image: "/images/recursos/antenaespacioprofundo.jpg",
      tags: ["Alimentación Crítica", "UPS", "Generación", "SCADA"],
      details: [
        {
          title: "Consultoría y Diseño",
          items: [
            "Definiciones críticas sobre el sistema eléctrico general.",
            "Estudio de coordinación del sistema de protecciones en baja tensión.",
            "Ingeniería de detalle del sistema de control completo.",
          ],
        },
        {
          title: "Provisión e Instalación",
          items: [
            "Montaje y cableado de distribución en BT y red de control.",
            "Sistema de control PLC cold redundant (Schneider M340).",
            "Medición avanzada con transductores ION inteligentes.",
          ],
        },
      ],
      gallery: [
        "/images/recursos/antenaespacioprofundo.jpg",
      ],
    },
    {
      id: "nihuil-2",
      category: "Energía",
      title: "Central Hidroeléctrica Nihuil 2",
      subtitle: "Actualización de sistema de protecciones",
      summary:
        "Ingeniería de detalle para el recambio y modernización de los paneles de protección del complejo hidroeléctrico.",
      description:
        "A solicitud de Hidroeléctrica Nihuiles SA, llevamos a cabo la elaboración exhaustiva de la ingeniería de detalle para el nuevo sistema de protecciones de la central. El objetivo fue elevar los estándares de seguridad y confiabilidad de los activos de generación primaria.",
      image: "/images/recursos/Nihuil.jpg",
      tags: ["Protecciones", "Hidroeléctrica", "Generación"],
      details: [
        {
          title: "Alcance de la Ingeniería",
          items: [
            "Diseño de 6 paneles de protección para conjuntos Generador-Transformador (Unidades 1 al 6).",
            "Diseño de 2 paneles de protección de línea de transmisión.",
            "Diseño de 1 panel de protección dedicado para interruptor de acoplamiento.",
          ],
        },
        {
          title: "Impacto",
          items: [
            "Modernización tecnológica de la seguridad de la planta.",
            "Mayor selectividad ante fallas en la red.",
            "Protección integral de los activos más valiosos de la central.",
          ],
        },
      ],
      gallery: [
        "/images/recursos/Nihuil.jpg",
      ],
    },
  ] as RecursoCaso[],
};
