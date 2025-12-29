<?php
header('Content-Type: application/json; charset=utf-8');

// Reemplaza por tu API Key de OpenAI o carga desde un entorno seguro.
 = 'sk-...';

if (! ||  === 'sk-...') {
  http_response_code(500);
  echo json_encode(["response" => "API key no configurada."], JSON_UNESCAPED_UNICODE);
  exit;
}

 = file_get_contents('php://input');
 = json_decode(, true);
 = isset(['messages']) && is_array(['messages']) ? ['messages'] : [];

 = [];
foreach ( as ) {
  if (!isset(['content'])) {
    continue;
  }
   = (['role'] ?? 'user') === 'assistant' ? 'assistant' : 'user';
  [] = [
    'role' => ,
    'content' => strval(['content']),
  ];
}

SITE:
{
  "name": "LYNX",
  "company": {
    "legalName": "LYNX SpA",
    "group": "Grupo Oeste"
  },
  "tagline": "Energ├¡a y Tecnolog├¡a para soluciones modernas",
  "description": "LYNX integra energ├¡a e innovaci├│n tecnol├│gica para acelerar operaciones cr├¡ticas con foco en performance y confiabilidad.",
  "nav": [
    {
      "label": "Inicio",
      "href": "/"
    },
    {
      "label": "Energ├¡a",
      "href": "/energia"
    },
    {
      "label": "Tecnolog├¡a",
      "href": "/tecnologia"
    },
    {
      "label": "Recursos",
      "href": "/recursos"
    },
    {
      "label": "Contacto",
      "href": "/contacto"
    }
  ],
  "aria": {
    "primaryNav": "Navegaci├│n principal"
  },
  "theme": {
    "toggleLabel": "Modo",
    "light": "Claro",
    "dark": "Oscuro"
  },
  "contact": {
    "email": "hola@lynx.com",
    "mobile": "+56 9 6214 8623",
    "phone": "+56 2 24054964",
    "address": "Santiago, Chile",
    "region": "Operaci├│n en Chile y Argentina",
    "social": [
      {
        "label": "LinkedIn",
        "href": "#"
      },
      {
        "label": "X",
        "href": "#"
      },
      {
        "label": "Instagram",
        "href": "#"
      }
    ]
  },
  "footer": {
    "navTitle": "Navegaci├│n",
    "contactTitle": "Contacto",
    "rights": "Todos los derechos reservados."
  },
  "homeHero": {
    "badge": "Soluciones integradas",
    "description": "Unimos ingenier├¡a energ├®tica y tecnolog├¡a aplicada para desplegar soluciones premium con impacto medible."
  },
  "homeCards": [
    {
      "label": "Energ├¡a",
      "title": "Infraestructura resiliente",
      "description": "Optimizaci├│n de consumo, continuidad operativa y control en tiempo real.",
      "cta": "Explorar Energ├¡a",
      "href": "/energia",
      "image": "/images/energia/placeholder.svg"
    },
    {
      "label": "Tecnolog├¡a",
      "title": "Plataformas inteligentes",
      "description": "Apps, automatizaci├│n e integraciones seguras para decisiones r├ípidas.",
      "cta": "Explorar Tecnolog├¡a",
      "href": "/tecnologia",
      "image": "/images/tecnologia/placeholder.svg"
    }
  ],
  "about": {
    "title": "Nosotros",
    "subtitle": "LYNX SpA",
    "cover": {
      "image": "/images/brand/about.svg",
      "alt": "Equipo LYNX en operaciones de energ├¡a"
    },
    "body": [
      "Desde sus or├¡genes en el a├▒o 1993, LYNX SpA se ha consolidado como reconocida integradora de tecnolog├¡as de la automatizaci├│n de procesos, a trav├®s de la concreci├│n de m├║ltiples implementaciones satisfactorias en los m├ís diversos rubros de la industria, tanto en Argentina como en el exterior.",
      "Si bien continuamos operando en todas las ramas de la industria, en los ├║ltimos a├▒os nos hemos focalizado en la provisi├│n de soluciones que involucran la energ├¡a el├®ctrica, desde diferentes puntos de vista.",
      "A lo largo de nuestra trayectoria nos hemos adaptado a las cambiantes condiciones imperantes en los mercados que atendemos y a la vez hemos sabido mantener un estrecho di├ílogo con la vanguardia tecnol├│gica, algunas veces como proveedores solo de servicios y otras con provisi├│n de equipamiento, pero siempre defendiendo la consigna de alcanzar y superar los resultados esperados por nuestros clientes.",
      "LYNX SpA se especializa en control de energ├¡a el├®ctrica como empresa proveedora de soluciones integrales a trav├®s de la comercializaci├│n de equipamiento el├®ctrico con tecnolog├¡a de vanguardia y los servicios de ingenier├¡a complementarios para su programaci├│n, instalaci├│n, puesta en servicio y explotaci├│n, destinados al mercado de la energ├¡a el├®ctrica en cualquiera de sus ├ímbitos de aplicaci├│n."
    ],
    "teamTitle": "Portada Nosotros",
    "teamBody": [
      "Para lograr los objetivos en cada proyecto contamos, como socios estrat├®gicos, a fabricantes y proveedores, de trayectoria y reconocimiento de alcance global, con una cartera de soluciones ampliamente probadas que nos brindan su respaldo tecnol├│gico e institucional. Esto se traduce en un equipo con el m├ís elevado grado de compromiso, asumido en cada trabajo.",
      "Nuestro equipo de profesionales est├í constituido por recursos humanos con una s├│lida formaci├│n en tecnolog├¡as de automatismos avanzados y una amplia trayectoria en integraciones en las ├íreas de control, medici├│n y protecci├│n de sistemas asociados a la energ├¡a el├®ctrica.",
      "Las ├íreas de operaci├│n incluyen el personal id├│neo para acompa├▒ar nuestro producto, desde la concepci├│n del proyecto en sus etapas de ingenier├¡a conceptual y b├ísica, pasando por la definici├│n de materiales, la ingenier├¡a de detalle, hasta cubrir cada uno de los pasos siguientes arribando a la concreci├│n de la soluci├│n integral mediante la construcci├│n electromec├ínica, la programaci├│n y configuraci├│n de hardware, los ensayos en f├íbrica, los montajes en obra para concluir con los ensayos en sitio y la puesta en servicio.",
      "La extensa experiencia de nuestro personal en proyectos el├®ctricos, unido a la capacitaci├│n continua en ├íreas espec├¡ficas, junto con el soporte de nuestros proveedores, nos permite encarar d├¡a a d├¡a nuevos desaf├¡os con confianza y solidez."
    ],
    "highlightsTitle": "Sobre la empresa",
    "highlights": [
      {
        "title": "Identidad",
        "description": "Integradora de tecnolog├¡as de automatizaci├│n de procesos.",
        "icon": "layers"
      },
      {
        "title": "Trayectoria",
        "description": "Or├¡genes desde 1993 con presencia regional.",
        "icon": "clock"
      },
      {
        "title": "Respaldo corporativo",
        "description": "Parte del Grupo Oeste en Argentina y Chile.",
        "icon": "building"
      },
      {
        "title": "Alcance",
        "description": "Implementaciones locales e internacionales.",
        "icon": "globe"
      },
      {
        "title": "Filosof├¡a",
        "description": "Capacitaci├│n continua y soporte de partners.",
        "icon": "users"
      },
      {
        "title": "Propuesta de valor",
        "description": "Desaf├¡os diarios con confianza y solidez.",
        "icon": "shield"
      }
    ]
  },
  "partners": {
    "title": "Nuestros aliados tecnol├│gicos",
    "subtitle": "Trabajamos con fabricantes globales y software especializado para entregar soluciones robustas y seguras.",
    "items": [
      {
        "name": "SEL",
        "href": "https://selinc.com",
        "description": "Schweitzer Engineering Laboratories. L├¡deres en protecci├│n, automatizaci├│n y control.",
        "image": "/images/partners/SEL.jpeg"
      },
      {
        "name": "Survalent",
        "href": "https://www.survalent.com/",
        "description": "Survalent Technology. SCADA avanzado para energ├¡a, miner├¡a, agua y distribuci├│n.",
        "image": "/images/partners/survalent.png"
      },
      {
        "name": "Systems With Intelligence",
        "href": "https://systemswithintelligence.com",
        "description": "Monitoreo y vigilancia para activos cr├¡ticos en tiempo real.",
        "image": "/images/partners/SWI.jpg"
      },
      {
        "name": "N3uron",
        "href": "https://n3uron.com",
        "description": "Conectividad industrial IoT y gesti├│n de datos.",
        "image": "/images/partners/N3uron-favicom-picture.jpg"
      }
    ]
  },
  "experience": {
    "title": "Portafolio de proyectos",
    "subtitle": "Resultados comprobados en energ├¡a, protecci├│n y automatizaci├│n de activos cr├¡ticos.",
    "cases": [
      {
        "client": "Cooperativa El├®ctrica de Godoy Cruz (Mendoza)",
        "work": "Ingenier├¡a de detalle de tableros de control.",
        "scope": "Supervisi├│n y comando de interruptores en playa de 132 kV."
      },
      {
        "client": "Hidroel├®ctrica Nihuiles S.A.",
        "work": "Ingenier├¡a de sistema de protecci├│n.",
        "scope": "Paneles para el conjunto Generador-Transformador (1 al 6) y protecci├│n de l├¡neas de transmisi├│n."
      }
    ]
  },
  "homeSection": {
    "title": "┬┐Qu├® hace LYNX?",
    "subtitle": "Activamos proyectos con foco en eficiencia, continuidad y crecimiento sostenible."
  },
  "homeBullets": [
    {
      "title": "Diagn├│stico experto",
      "description": "Levantamos requisitos cr├¡ticos y un plan claro en semanas."
    },
    {
      "title": "Ejecuci├│n integral",
      "description": "Integramos energ├¡a, software e infraestructura sin fricciones."
    },
    {
      "title": "Escalabilidad real",
      "description": "Arquitecturas preparadas para crecer sin deuda t├®cnica."
    }
  ],
  "homeCta": {
    "title": "┬┐Listo para despegar con LYNX?",
    "text": "Conversemos sobre tu desaf├¡o y dise├▒emos la soluci├│n ideal.",
    "buttonLabel": "Hablemos",
    "href": "/contacto"
  },
  "contactPage": {
    "title": "Contacto",
    "description": "Hablemos sobre tu proyecto. Recibimos tu mensaje y respondemos r├ípido.",
    "eyebrow": "Contacto",
    "heading": "Hablemos de tu pr├│ximo proyecto",
    "subtitle": "Completa el formulario y nuestro equipo te responde con una propuesta clara.",
    "form": {
      "nameLabel": "Nombre",
      "namePlaceholder": "Tu nombre",
      "nameErrorRequired": "Ingresa tu nombre.",
      "emailLabel": "Email",
      "emailPlaceholder": "tu@email.com",
      "emailErrorRequired": "Ingresa un email v├ílido.",
      "emailErrorAt": "El email debe incluir un @.",
      "messageLabel": "Mensaje",
      "messagePlaceholder": "Contanos sobre tu proyecto",
      "messageErrorMin": "Contanos un poco m├ís (m├¡n. 10 caracteres).",
      "submitLabel": "Enviar mensaje",
      "submittingLabel": "Enviando...",
      "statusError": "Revisa los campos marcados.",
      "statusSuccess": "Mensaje listo para enviar. Te respondemos pronto."
    }
  },
  "bot": {
    "buttonLabel": "BOT LYNX",
    "heading": "Hola, soy Lynx Bot.",
    "subheading": "D├®jame tus datos y un ingeniero te contactar├í.",
    "nameLabel": "Nombre",
    "namePlaceholder": "Tu nombre",
    "emailLabel": "Email",
    "emailPlaceholder": "tu@email.com",
    "messageLabel": "Mensaje",
    "messagePlaceholder": "Contanos sobre tu proyecto",
    "submitLabel": "Enviar solicitud",
    "submittingLabel": "Enviando...",
    "successMessage": "┬íRecibido! Nos pondremos en contacto pronto."
  }
}

ENERGIA:
{
  "meta": {
    "title": "Energ├¡a",
    "description": "Soluciones de energ├¡a para operaciones cr├¡ticas: eficiencia, resiliencia y control en tiempo real."
  },
  "hero": {
    "badge": "Vertical Energ├¡a",
    "title": "Energ├¡a confiable para operaciones cr├¡ticas",
    "subtitle": "Dise├▒amos infraestructura resiliente y eficiente para industrias que no pueden detenerse.",
    "claim": "Control, eficiencia y continuidad con foco en performance."
  },
  "sections": {
    "featuresTitle": "Capacidades clave",
    "featuresSubtitle": "Combinamos ingenier├¡a energ├®tica y control digital para optimizar cada operaci├│n.",
    "servicesTitle": "Servicios",
    "servicesSubtitle": "Soluciones integrales para el control y la calidad de la energ├¡a el├®ctrica.",
    "useCasesTitle": "Casos de uso",
    "useCasesSubtitle": "Soluciones dise├▒adas para entornos cr├¡ticos y exigentes.",
    "galleryTitle": "Infraestructura en im├ígenes",
    "gallerySubtitle": "Un vistazo a nuestras soluciones, operaciones y proyectos en energ├¡a.",
    "faqTitle": "Preguntas frecuentes de energ├¡a"
  },
  "features": [
    {
      "title": "Optimizaci├│n de consumo",
      "description": "Modelos predictivos y ajustes finos para reducir costos energ├®ticos.",
      "icon": "bolt"
    },
    {
      "title": "Gesti├│n de redes",
      "description": "Monitoreo centralizado con alertas y decisiones en tiempo real.",
      "icon": "grid"
    },
    {
      "title": "Resiliencia operativa",
      "description": "Dise├▒os redundantes y planes de continuidad cr├¡ticos.",
      "icon": "shield"
    },
    {
      "title": "Medici├│n inteligente",
      "description": "Telemetr├¡a avanzada con paneles listos para auditor├¡as.",
      "icon": "sensor"
    },
    {
      "title": "Integraci├│n OT/IT",
      "description": "Conectamos activos industriales con plataformas digitales.",
      "icon": "link"
    }
  ],
  "services": [
    {
      "title": "Automatismos de subestaciones",
      "description": "Ingenier├¡a, provisi├│n, integraci├│n y construcci├│n. Nos adaptamos al est├índar del cliente."
    },
    {
      "title": "Medici├│n y calidad de energ├¡a",
      "description": "Soluciones de hardware y software con amplio conocimiento del mercado de magnitudes el├®ctricas."
    },
    {
      "title": "Bancos de capacitores",
      "description": "Estrategias y algoritmos de control para regular el factor de potencia en distribuci├│n y transporte."
    },
    {
      "title": "Salas el├®ctricas",
      "description": "Provisiones a medida con envolventes est├índar o dise├▒os propios para usos especiales."
    },
    {
      "title": "Energ├¡as alternativas",
      "description": "Estudios de viabilidad para integrar y vender excedentes de energ├¡a a la red."
    },
    {
      "title": "Automatismos industriales",
      "description": "M├íximo aprovechamiento de recursos disponibles y eficiencia en producci├│n."
    }
  ],
  "useCases": [
    {
      "title": "Parques industriales",
      "description": "Energ├¡a estable para clusters con alta demanda simult├ínea."
    },
    {
      "title": "Centros log├¡sticos",
      "description": "Continuidad y respaldo para operaciones 24/7."
    },
    {
      "title": "Miner├¡a y recursos",
      "description": "Infraestructura robusta en entornos exigentes."
    },
    {
      "title": "Salud y laboratorios",
      "description": "Protecci├│n de equipos cr├¡ticos y datos sensibles."
    }
  ],
  "faqs": [
    {
      "question": "┬┐Cu├ínto tarda una auditor├¡a inicial?",
      "answer": "Dependiendo del tama├▒o de la operaci├│n, entre 2 y 4 semanas para un diagn├│stico accionable."
    },
    {
      "question": "┬┐Integran con sistemas existentes?",
      "answer": "S├¡. Priorizamos integraciones con infraestructura actual para acelerar resultados."
    },
    {
      "question": "┬┐Pueden acompa├▒ar la implementaci├│n?",
      "answer": "Incluimos gesti├│n de proyecto, puesta en marcha y monitoreo continuo."
    }
  ],
  "cta": {
    "title": "Llevemos tu operaci├│n a un nuevo nivel",
    "text": "Contanos tu desaf├¡o energ├®tico y dise├▒emos un plan a medida.",
    "buttonLabel": "Ir a contacto"
  }
}

TECNOLOGIA:
{
  "meta": {
    "title": "Tecnolog├¡a",
    "description": "Plataformas y soluciones digitales: apps, automatizaci├│n, IoT e integraciones seguras."
  },
  "hero": {
    "badge": "Vertical Tecnolog├¡a",
    "title": "Tecnolog├¡a que impulsa decisiones inteligentes",
    "subtitle": "Construimos plataformas y automatizaciones para operar con precisi├│n y velocidad.",
    "claim": "Ecosistemas conectados, datos ├║tiles y experiencias premium."
  },
  "sections": {
    "featuresTitle": "Capacidades clave",
    "featuresSubtitle": "Dise├▒amos ecosistemas digitales para acelerar el negocio y reducir fricciones.",
    "servicesTitle": "Servicios",
    "servicesSubtitle": "Equipos multidisciplinarios para construir, integrar y escalar plataformas.",
    "useCasesTitle": "Casos de uso",
    "useCasesSubtitle": "Soluciones digitales para operaciones conectadas y resultados medibles.",
    "faqTitle": "Preguntas frecuentes de tecnolog├¡a"
  },
  "features": [
    {
      "title": "Apps y portales",
      "description": "Experiencias digitales orientadas a performance y adopci├│n r├ípida.",
      "icon": "rocket"
    },
    {
      "title": "Automatizaci├│n",
      "description": "Flujos inteligentes que reducen tiempos operativos.",
      "icon": "cpu"
    },
    {
      "title": "IoT industrial",
      "description": "Sensores y telemetr├¡a para operaciones conectadas.",
      "icon": "sensor"
    },
    {
      "title": "Integraciones seguras",
      "description": "APIs, middleware y control de acceso robusto.",
      "icon": "link"
    },
    {
      "title": "Data en tiempo real",
      "description": "Dashboards con insights accionables y alertas.",
      "icon": "grid"
    }
  ],
  "services": [
    {
      "title": "Dise├▒o de producto",
      "description": "Discovery, UX/UI y prototipos listos para iterar."
    },
    {
      "title": "Desarrollo full-stack",
      "description": "Arquitectura moderna con foco en escalabilidad."
    },
    {
      "title": "Plataformas IoT",
      "description": "Gesti├│n de dispositivos, eventos y anal├¡tica."
    },
    {
      "title": "Integraciones empresariales",
      "description": "Conectores con ERPs, CRMs y sistemas legados."
    },
    {
      "title": "Automatizaci├│n inteligente",
      "description": "RPA + workflows para eliminar tareas repetitivas."
    },
    {
      "title": "Observabilidad",
      "description": "Monitoreo, logs y alertas con est├índares premium."
    }
  ],
  "useCases": [
    {
      "title": "Operaciones conectadas",
      "description": "Unificamos datos de campo y backoffice."
    },
    {
      "title": "Mantenimiento predictivo",
      "description": "Modelos que anticipan fallas y optimizan activos."
    },
    {
      "title": "Integraci├│n multi-sede",
      "description": "Sistemas sincronizados en operaciones distribuidas."
    },
    {
      "title": "Experiencias B2B",
      "description": "Portales y apps para clientes estrat├®gicos."
    }
  ],
  "faqs": [
    {
      "question": "┬┐Qu├® stack utilizan?",
      "answer": "Elegimos tecnolog├¡as modernas con foco en performance, seguridad y escalabilidad."
    },
    {
      "question": "┬┐Pueden integrarse con legacy?",
      "answer": "S├¡. Dise├▒amos integraciones seguras para convivir con sistemas existentes."
    },
    {
      "question": "┬┐C├│mo entregan el producto?",
      "answer": "Trabajamos por etapas con releases incrementales y m├®tricas claras."
    }
  ],
  "cta": {
    "title": "Potenciemos tu ecosistema digital",
    "text": "Contanos tu objetivo y armamos una hoja de ruta tecnol├│gica.",
    "buttonLabel": "Contactar"
  }
} = <<<'CONTEXT'
SITE:
{
  "name": "LYNX",
  "company": {
    "legalName": "LYNX SpA",
    "group": "Grupo Oeste"
  },
  "tagline": "Energ├¡a y Tecnolog├¡a para soluciones modernas",
  "description": "LYNX integra energ├¡a e innovaci├│n tecnol├│gica para acelerar operaciones cr├¡ticas con foco en performance y confiabilidad.",
  "nav": [
    {
      "label": "Inicio",
      "href": "/"
    },
    {
      "label": "Energ├¡a",
      "href": "/energia"
    },
    {
      "label": "Tecnolog├¡a",
      "href": "/tecnologia"
    },
    {
      "label": "Recursos",
      "href": "/recursos"
    },
    {
      "label": "Contacto",
      "href": "/contacto"
    }
  ],
  "aria": {
    "primaryNav": "Navegaci├│n principal"
  },
  "theme": {
    "toggleLabel": "Modo",
    "light": "Claro",
    "dark": "Oscuro"
  },
  "contact": {
    "email": "hola@lynx.com",
    "mobile": "+56 9 6214 8623",
    "phone": "+56 2 24054964",
    "address": "Santiago, Chile",
    "region": "Operaci├│n en Chile y Argentina",
    "social": [
      {
        "label": "LinkedIn",
        "href": "#"
      },
      {
        "label": "X",
        "href": "#"
      },
      {
        "label": "Instagram",
        "href": "#"
      }
    ]
  },
  "footer": {
    "navTitle": "Navegaci├│n",
    "contactTitle": "Contacto",
    "rights": "Todos los derechos reservados."
  },
  "homeHero": {
    "badge": "Soluciones integradas",
    "description": "Unimos ingenier├¡a energ├®tica y tecnolog├¡a aplicada para desplegar soluciones premium con impacto medible."
  },
  "homeCards": [
    {
      "label": "Energ├¡a",
      "title": "Infraestructura resiliente",
      "description": "Optimizaci├│n de consumo, continuidad operativa y control en tiempo real.",
      "cta": "Explorar Energ├¡a",
      "href": "/energia",
      "image": "/images/energia/placeholder.svg"
    },
    {
      "label": "Tecnolog├¡a",
      "title": "Plataformas inteligentes",
      "description": "Apps, automatizaci├│n e integraciones seguras para decisiones r├ípidas.",
      "cta": "Explorar Tecnolog├¡a",
      "href": "/tecnologia",
      "image": "/images/tecnologia/placeholder.svg"
    }
  ],
  "about": {
    "title": "Nosotros",
    "subtitle": "LYNX SpA",
    "cover": {
      "image": "/images/brand/about.svg",
      "alt": "Equipo LYNX en operaciones de energ├¡a"
    },
    "body": [
      "Desde sus or├¡genes en el a├▒o 1993, LYNX SpA se ha consolidado como reconocida integradora de tecnolog├¡as de la automatizaci├│n de procesos, a trav├®s de la concreci├│n de m├║ltiples implementaciones satisfactorias en los m├ís diversos rubros de la industria, tanto en Argentina como en el exterior.",
      "Si bien continuamos operando en todas las ramas de la industria, en los ├║ltimos a├▒os nos hemos focalizado en la provisi├│n de soluciones que involucran la energ├¡a el├®ctrica, desde diferentes puntos de vista.",
      "A lo largo de nuestra trayectoria nos hemos adaptado a las cambiantes condiciones imperantes en los mercados que atendemos y a la vez hemos sabido mantener un estrecho di├ílogo con la vanguardia tecnol├│gica, algunas veces como proveedores solo de servicios y otras con provisi├│n de equipamiento, pero siempre defendiendo la consigna de alcanzar y superar los resultados esperados por nuestros clientes.",
      "LYNX SpA se especializa en control de energ├¡a el├®ctrica como empresa proveedora de soluciones integrales a trav├®s de la comercializaci├│n de equipamiento el├®ctrico con tecnolog├¡a de vanguardia y los servicios de ingenier├¡a complementarios para su programaci├│n, instalaci├│n, puesta en servicio y explotaci├│n, destinados al mercado de la energ├¡a el├®ctrica en cualquiera de sus ├ímbitos de aplicaci├│n."
    ],
    "teamTitle": "Portada Nosotros",
    "teamBody": [
      "Para lograr los objetivos en cada proyecto contamos, como socios estrat├®gicos, a fabricantes y proveedores, de trayectoria y reconocimiento de alcance global, con una cartera de soluciones ampliamente probadas que nos brindan su respaldo tecnol├│gico e institucional. Esto se traduce en un equipo con el m├ís elevado grado de compromiso, asumido en cada trabajo.",
      "Nuestro equipo de profesionales est├í constituido por recursos humanos con una s├│lida formaci├│n en tecnolog├¡as de automatismos avanzados y una amplia trayectoria en integraciones en las ├íreas de control, medici├│n y protecci├│n de sistemas asociados a la energ├¡a el├®ctrica.",
      "Las ├íreas de operaci├│n incluyen el personal id├│neo para acompa├▒ar nuestro producto, desde la concepci├│n del proyecto en sus etapas de ingenier├¡a conceptual y b├ísica, pasando por la definici├│n de materiales, la ingenier├¡a de detalle, hasta cubrir cada uno de los pasos siguientes arribando a la concreci├│n de la soluci├│n integral mediante la construcci├│n electromec├ínica, la programaci├│n y configuraci├│n de hardware, los ensayos en f├íbrica, los montajes en obra para concluir con los ensayos en sitio y la puesta en servicio.",
      "La extensa experiencia de nuestro personal en proyectos el├®ctricos, unido a la capacitaci├│n continua en ├íreas espec├¡ficas, junto con el soporte de nuestros proveedores, nos permite encarar d├¡a a d├¡a nuevos desaf├¡os con confianza y solidez."
    ],
    "highlightsTitle": "Sobre la empresa",
    "highlights": [
      {
        "title": "Identidad",
        "description": "Integradora de tecnolog├¡as de automatizaci├│n de procesos.",
        "icon": "layers"
      },
      {
        "title": "Trayectoria",
        "description": "Or├¡genes desde 1993 con presencia regional.",
        "icon": "clock"
      },
      {
        "title": "Respaldo corporativo",
        "description": "Parte del Grupo Oeste en Argentina y Chile.",
        "icon": "building"
      },
      {
        "title": "Alcance",
        "description": "Implementaciones locales e internacionales.",
        "icon": "globe"
      },
      {
        "title": "Filosof├¡a",
        "description": "Capacitaci├│n continua y soporte de partners.",
        "icon": "users"
      },
      {
        "title": "Propuesta de valor",
        "description": "Desaf├¡os diarios con confianza y solidez.",
        "icon": "shield"
      }
    ]
  },
  "partners": {
    "title": "Nuestros aliados tecnol├│gicos",
    "subtitle": "Trabajamos con fabricantes globales y software especializado para entregar soluciones robustas y seguras.",
    "items": [
      {
        "name": "SEL",
        "href": "https://selinc.com",
        "description": "Schweitzer Engineering Laboratories. L├¡deres en protecci├│n, automatizaci├│n y control.",
        "image": "/images/partners/SEL.jpeg"
      },
      {
        "name": "Survalent",
        "href": "https://www.survalent.com/",
        "description": "Survalent Technology. SCADA avanzado para energ├¡a, miner├¡a, agua y distribuci├│n.",
        "image": "/images/partners/survalent.png"
      },
      {
        "name": "Systems With Intelligence",
        "href": "https://systemswithintelligence.com",
        "description": "Monitoreo y vigilancia para activos cr├¡ticos en tiempo real.",
        "image": "/images/partners/SWI.jpg"
      },
      {
        "name": "N3uron",
        "href": "https://n3uron.com",
        "description": "Conectividad industrial IoT y gesti├│n de datos.",
        "image": "/images/partners/N3uron-favicom-picture.jpg"
      }
    ]
  },
  "experience": {
    "title": "Portafolio de proyectos",
    "subtitle": "Resultados comprobados en energ├¡a, protecci├│n y automatizaci├│n de activos cr├¡ticos.",
    "cases": [
      {
        "client": "Cooperativa El├®ctrica de Godoy Cruz (Mendoza)",
        "work": "Ingenier├¡a de detalle de tableros de control.",
        "scope": "Supervisi├│n y comando de interruptores en playa de 132 kV."
      },
      {
        "client": "Hidroel├®ctrica Nihuiles S.A.",
        "work": "Ingenier├¡a de sistema de protecci├│n.",
        "scope": "Paneles para el conjunto Generador-Transformador (1 al 6) y protecci├│n de l├¡neas de transmisi├│n."
      }
    ]
  },
  "homeSection": {
    "title": "┬┐Qu├® hace LYNX?",
    "subtitle": "Activamos proyectos con foco en eficiencia, continuidad y crecimiento sostenible."
  },
  "homeBullets": [
    {
      "title": "Diagn├│stico experto",
      "description": "Levantamos requisitos cr├¡ticos y un plan claro en semanas."
    },
    {
      "title": "Ejecuci├│n integral",
      "description": "Integramos energ├¡a, software e infraestructura sin fricciones."
    },
    {
      "title": "Escalabilidad real",
      "description": "Arquitecturas preparadas para crecer sin deuda t├®cnica."
    }
  ],
  "homeCta": {
    "title": "┬┐Listo para despegar con LYNX?",
    "text": "Conversemos sobre tu desaf├¡o y dise├▒emos la soluci├│n ideal.",
    "buttonLabel": "Hablemos",
    "href": "/contacto"
  },
  "contactPage": {
    "title": "Contacto",
    "description": "Hablemos sobre tu proyecto. Recibimos tu mensaje y respondemos r├ípido.",
    "eyebrow": "Contacto",
    "heading": "Hablemos de tu pr├│ximo proyecto",
    "subtitle": "Completa el formulario y nuestro equipo te responde con una propuesta clara.",
    "form": {
      "nameLabel": "Nombre",
      "namePlaceholder": "Tu nombre",
      "nameErrorRequired": "Ingresa tu nombre.",
      "emailLabel": "Email",
      "emailPlaceholder": "tu@email.com",
      "emailErrorRequired": "Ingresa un email v├ílido.",
      "emailErrorAt": "El email debe incluir un @.",
      "messageLabel": "Mensaje",
      "messagePlaceholder": "Contanos sobre tu proyecto",
      "messageErrorMin": "Contanos un poco m├ís (m├¡n. 10 caracteres).",
      "submitLabel": "Enviar mensaje",
      "submittingLabel": "Enviando...",
      "statusError": "Revisa los campos marcados.",
      "statusSuccess": "Mensaje listo para enviar. Te respondemos pronto."
    }
  },
  "bot": {
    "buttonLabel": "BOT LYNX",
    "heading": "Hola, soy Lynx Bot.",
    "subheading": "D├®jame tus datos y un ingeniero te contactar├í.",
    "nameLabel": "Nombre",
    "namePlaceholder": "Tu nombre",
    "emailLabel": "Email",
    "emailPlaceholder": "tu@email.com",
    "messageLabel": "Mensaje",
    "messagePlaceholder": "Contanos sobre tu proyecto",
    "submitLabel": "Enviar solicitud",
    "submittingLabel": "Enviando...",
    "successMessage": "┬íRecibido! Nos pondremos en contacto pronto."
  }
}

ENERGIA:
{
  "meta": {
    "title": "Energ├¡a",
    "description": "Soluciones de energ├¡a para operaciones cr├¡ticas: eficiencia, resiliencia y control en tiempo real."
  },
  "hero": {
    "badge": "Vertical Energ├¡a",
    "title": "Energ├¡a confiable para operaciones cr├¡ticas",
    "subtitle": "Dise├▒amos infraestructura resiliente y eficiente para industrias que no pueden detenerse.",
    "claim": "Control, eficiencia y continuidad con foco en performance."
  },
  "sections": {
    "featuresTitle": "Capacidades clave",
    "featuresSubtitle": "Combinamos ingenier├¡a energ├®tica y control digital para optimizar cada operaci├│n.",
    "servicesTitle": "Servicios",
    "servicesSubtitle": "Soluciones integrales para el control y la calidad de la energ├¡a el├®ctrica.",
    "useCasesTitle": "Casos de uso",
    "useCasesSubtitle": "Soluciones dise├▒adas para entornos cr├¡ticos y exigentes.",
    "galleryTitle": "Infraestructura en im├ígenes",
    "gallerySubtitle": "Un vistazo a nuestras soluciones, operaciones y proyectos en energ├¡a.",
    "faqTitle": "Preguntas frecuentes de energ├¡a"
  },
  "features": [
    {
      "title": "Optimizaci├│n de consumo",
      "description": "Modelos predictivos y ajustes finos para reducir costos energ├®ticos.",
      "icon": "bolt"
    },
    {
      "title": "Gesti├│n de redes",
      "description": "Monitoreo centralizado con alertas y decisiones en tiempo real.",
      "icon": "grid"
    },
    {
      "title": "Resiliencia operativa",
      "description": "Dise├▒os redundantes y planes de continuidad cr├¡ticos.",
      "icon": "shield"
    },
    {
      "title": "Medici├│n inteligente",
      "description": "Telemetr├¡a avanzada con paneles listos para auditor├¡as.",
      "icon": "sensor"
    },
    {
      "title": "Integraci├│n OT/IT",
      "description": "Conectamos activos industriales con plataformas digitales.",
      "icon": "link"
    }
  ],
  "services": [
    {
      "title": "Automatismos de subestaciones",
      "description": "Ingenier├¡a, provisi├│n, integraci├│n y construcci├│n. Nos adaptamos al est├índar del cliente."
    },
    {
      "title": "Medici├│n y calidad de energ├¡a",
      "description": "Soluciones de hardware y software con amplio conocimiento del mercado de magnitudes el├®ctricas."
    },
    {
      "title": "Bancos de capacitores",
      "description": "Estrategias y algoritmos de control para regular el factor de potencia en distribuci├│n y transporte."
    },
    {
      "title": "Salas el├®ctricas",
      "description": "Provisiones a medida con envolventes est├índar o dise├▒os propios para usos especiales."
    },
    {
      "title": "Energ├¡as alternativas",
      "description": "Estudios de viabilidad para integrar y vender excedentes de energ├¡a a la red."
    },
    {
      "title": "Automatismos industriales",
      "description": "M├íximo aprovechamiento de recursos disponibles y eficiencia en producci├│n."
    }
  ],
  "useCases": [
    {
      "title": "Parques industriales",
      "description": "Energ├¡a estable para clusters con alta demanda simult├ínea."
    },
    {
      "title": "Centros log├¡sticos",
      "description": "Continuidad y respaldo para operaciones 24/7."
    },
    {
      "title": "Miner├¡a y recursos",
      "description": "Infraestructura robusta en entornos exigentes."
    },
    {
      "title": "Salud y laboratorios",
      "description": "Protecci├│n de equipos cr├¡ticos y datos sensibles."
    }
  ],
  "faqs": [
    {
      "question": "┬┐Cu├ínto tarda una auditor├¡a inicial?",
      "answer": "Dependiendo del tama├▒o de la operaci├│n, entre 2 y 4 semanas para un diagn├│stico accionable."
    },
    {
      "question": "┬┐Integran con sistemas existentes?",
      "answer": "S├¡. Priorizamos integraciones con infraestructura actual para acelerar resultados."
    },
    {
      "question": "┬┐Pueden acompa├▒ar la implementaci├│n?",
      "answer": "Incluimos gesti├│n de proyecto, puesta en marcha y monitoreo continuo."
    }
  ],
  "cta": {
    "title": "Llevemos tu operaci├│n a un nuevo nivel",
    "text": "Contanos tu desaf├¡o energ├®tico y dise├▒emos un plan a medida.",
    "buttonLabel": "Ir a contacto"
  }
}

TECNOLOGIA:
{
  "meta": {
    "title": "Tecnolog├¡a",
    "description": "Plataformas y soluciones digitales: apps, automatizaci├│n, IoT e integraciones seguras."
  },
  "hero": {
    "badge": "Vertical Tecnolog├¡a",
    "title": "Tecnolog├¡a que impulsa decisiones inteligentes",
    "subtitle": "Construimos plataformas y automatizaciones para operar con precisi├│n y velocidad.",
    "claim": "Ecosistemas conectados, datos ├║tiles y experiencias premium."
  },
  "sections": {
    "featuresTitle": "Capacidades clave",
    "featuresSubtitle": "Dise├▒amos ecosistemas digitales para acelerar el negocio y reducir fricciones.",
    "servicesTitle": "Servicios",
    "servicesSubtitle": "Equipos multidisciplinarios para construir, integrar y escalar plataformas.",
    "useCasesTitle": "Casos de uso",
    "useCasesSubtitle": "Soluciones digitales para operaciones conectadas y resultados medibles.",
    "faqTitle": "Preguntas frecuentes de tecnolog├¡a"
  },
  "features": [
    {
      "title": "Apps y portales",
      "description": "Experiencias digitales orientadas a performance y adopci├│n r├ípida.",
      "icon": "rocket"
    },
    {
      "title": "Automatizaci├│n",
      "description": "Flujos inteligentes que reducen tiempos operativos.",
      "icon": "cpu"
    },
    {
      "title": "IoT industrial",
      "description": "Sensores y telemetr├¡a para operaciones conectadas.",
      "icon": "sensor"
    },
    {
      "title": "Integraciones seguras",
      "description": "APIs, middleware y control de acceso robusto.",
      "icon": "link"
    },
    {
      "title": "Data en tiempo real",
      "description": "Dashboards con insights accionables y alertas.",
      "icon": "grid"
    }
  ],
  "services": [
    {
      "title": "Dise├▒o de producto",
      "description": "Discovery, UX/UI y prototipos listos para iterar."
    },
    {
      "title": "Desarrollo full-stack",
      "description": "Arquitectura moderna con foco en escalabilidad."
    },
    {
      "title": "Plataformas IoT",
      "description": "Gesti├│n de dispositivos, eventos y anal├¡tica."
    },
    {
      "title": "Integraciones empresariales",
      "description": "Conectores con ERPs, CRMs y sistemas legados."
    },
    {
      "title": "Automatizaci├│n inteligente",
      "description": "RPA + workflows para eliminar tareas repetitivas."
    },
    {
      "title": "Observabilidad",
      "description": "Monitoreo, logs y alertas con est├índares premium."
    }
  ],
  "useCases": [
    {
      "title": "Operaciones conectadas",
      "description": "Unificamos datos de campo y backoffice."
    },
    {
      "title": "Mantenimiento predictivo",
      "description": "Modelos que anticipan fallas y optimizan activos."
    },
    {
      "title": "Integraci├│n multi-sede",
      "description": "Sistemas sincronizados en operaciones distribuidas."
    },
    {
      "title": "Experiencias B2B",
      "description": "Portales y apps para clientes estrat├®gicos."
    }
  ],
  "faqs": [
    {
      "question": "┬┐Qu├® stack utilizan?",
      "answer": "Elegimos tecnolog├¡as modernas con foco en performance, seguridad y escalabilidad."
    },
    {
      "question": "┬┐Pueden integrarse con legacy?",
      "answer": "S├¡. Dise├▒amos integraciones seguras para convivir con sistemas existentes."
    },
    {
      "question": "┬┐C├│mo entregan el producto?",
      "answer": "Trabajamos por etapas con releases incrementales y m├®tricas claras."
    }
  ],
  "cta": {
    "title": "Potenciemos tu ecosistema digital",
    "text": "Contanos tu objetivo y armamos una hoja de ruta tecnol├│gica.",
    "buttonLabel": "Contactar"
  }
}
CONTEXT;

 = "Eres LYNX Bot, un asistente útil.\n" .
  "- Usa el CONTEXTO provisto para responder dudas.\n" .
  "- SI EL USUARIO QUIERE CONTACTAR/COTIZAR:\n" .
  "  1. Pídele amablemente su NOMBRE.\n" .
  "  2. Luego, pídele su EMAIL.\n" .
  "  3. Finalmente, pídele un MENSAJE o motivo breve.\n" .
  "  4. CUANDO TENGAS LOS 3 DATOS (Nombre, Email, Mensaje):\n" .
  "     NO respondas con texto normal. Responde ÚNICAMENTE con este bloque JSON exacto:\n" .
  "     {\n" .
  "       \"action\": \"submit_contact\",\n" .
  "       \"data\": {\n" .
  "         \"name\": \"el nombre aquí\",\n" .
  "         \"email\": \"el email aquí\",\n" .
  "         \"message\": \"el mensaje aquí\"\n" .
  "       }\n" .
  "     }\n\n" .
  "CONTEXTO:\n" . SITE:
{
  "name": "LYNX",
  "company": {
    "legalName": "LYNX SpA",
    "group": "Grupo Oeste"
  },
  "tagline": "Energ├¡a y Tecnolog├¡a para soluciones modernas",
  "description": "LYNX integra energ├¡a e innovaci├│n tecnol├│gica para acelerar operaciones cr├¡ticas con foco en performance y confiabilidad.",
  "nav": [
    {
      "label": "Inicio",
      "href": "/"
    },
    {
      "label": "Energ├¡a",
      "href": "/energia"
    },
    {
      "label": "Tecnolog├¡a",
      "href": "/tecnologia"
    },
    {
      "label": "Recursos",
      "href": "/recursos"
    },
    {
      "label": "Contacto",
      "href": "/contacto"
    }
  ],
  "aria": {
    "primaryNav": "Navegaci├│n principal"
  },
  "theme": {
    "toggleLabel": "Modo",
    "light": "Claro",
    "dark": "Oscuro"
  },
  "contact": {
    "email": "hola@lynx.com",
    "mobile": "+56 9 6214 8623",
    "phone": "+56 2 24054964",
    "address": "Santiago, Chile",
    "region": "Operaci├│n en Chile y Argentina",
    "social": [
      {
        "label": "LinkedIn",
        "href": "#"
      },
      {
        "label": "X",
        "href": "#"
      },
      {
        "label": "Instagram",
        "href": "#"
      }
    ]
  },
  "footer": {
    "navTitle": "Navegaci├│n",
    "contactTitle": "Contacto",
    "rights": "Todos los derechos reservados."
  },
  "homeHero": {
    "badge": "Soluciones integradas",
    "description": "Unimos ingenier├¡a energ├®tica y tecnolog├¡a aplicada para desplegar soluciones premium con impacto medible."
  },
  "homeCards": [
    {
      "label": "Energ├¡a",
      "title": "Infraestructura resiliente",
      "description": "Optimizaci├│n de consumo, continuidad operativa y control en tiempo real.",
      "cta": "Explorar Energ├¡a",
      "href": "/energia",
      "image": "/images/energia/placeholder.svg"
    },
    {
      "label": "Tecnolog├¡a",
      "title": "Plataformas inteligentes",
      "description": "Apps, automatizaci├│n e integraciones seguras para decisiones r├ípidas.",
      "cta": "Explorar Tecnolog├¡a",
      "href": "/tecnologia",
      "image": "/images/tecnologia/placeholder.svg"
    }
  ],
  "about": {
    "title": "Nosotros",
    "subtitle": "LYNX SpA",
    "cover": {
      "image": "/images/brand/about.svg",
      "alt": "Equipo LYNX en operaciones de energ├¡a"
    },
    "body": [
      "Desde sus or├¡genes en el a├▒o 1993, LYNX SpA se ha consolidado como reconocida integradora de tecnolog├¡as de la automatizaci├│n de procesos, a trav├®s de la concreci├│n de m├║ltiples implementaciones satisfactorias en los m├ís diversos rubros de la industria, tanto en Argentina como en el exterior.",
      "Si bien continuamos operando en todas las ramas de la industria, en los ├║ltimos a├▒os nos hemos focalizado en la provisi├│n de soluciones que involucran la energ├¡a el├®ctrica, desde diferentes puntos de vista.",
      "A lo largo de nuestra trayectoria nos hemos adaptado a las cambiantes condiciones imperantes en los mercados que atendemos y a la vez hemos sabido mantener un estrecho di├ílogo con la vanguardia tecnol├│gica, algunas veces como proveedores solo de servicios y otras con provisi├│n de equipamiento, pero siempre defendiendo la consigna de alcanzar y superar los resultados esperados por nuestros clientes.",
      "LYNX SpA se especializa en control de energ├¡a el├®ctrica como empresa proveedora de soluciones integrales a trav├®s de la comercializaci├│n de equipamiento el├®ctrico con tecnolog├¡a de vanguardia y los servicios de ingenier├¡a complementarios para su programaci├│n, instalaci├│n, puesta en servicio y explotaci├│n, destinados al mercado de la energ├¡a el├®ctrica en cualquiera de sus ├ímbitos de aplicaci├│n."
    ],
    "teamTitle": "Portada Nosotros",
    "teamBody": [
      "Para lograr los objetivos en cada proyecto contamos, como socios estrat├®gicos, a fabricantes y proveedores, de trayectoria y reconocimiento de alcance global, con una cartera de soluciones ampliamente probadas que nos brindan su respaldo tecnol├│gico e institucional. Esto se traduce en un equipo con el m├ís elevado grado de compromiso, asumido en cada trabajo.",
      "Nuestro equipo de profesionales est├í constituido por recursos humanos con una s├│lida formaci├│n en tecnolog├¡as de automatismos avanzados y una amplia trayectoria en integraciones en las ├íreas de control, medici├│n y protecci├│n de sistemas asociados a la energ├¡a el├®ctrica.",
      "Las ├íreas de operaci├│n incluyen el personal id├│neo para acompa├▒ar nuestro producto, desde la concepci├│n del proyecto en sus etapas de ingenier├¡a conceptual y b├ísica, pasando por la definici├│n de materiales, la ingenier├¡a de detalle, hasta cubrir cada uno de los pasos siguientes arribando a la concreci├│n de la soluci├│n integral mediante la construcci├│n electromec├ínica, la programaci├│n y configuraci├│n de hardware, los ensayos en f├íbrica, los montajes en obra para concluir con los ensayos en sitio y la puesta en servicio.",
      "La extensa experiencia de nuestro personal en proyectos el├®ctricos, unido a la capacitaci├│n continua en ├íreas espec├¡ficas, junto con el soporte de nuestros proveedores, nos permite encarar d├¡a a d├¡a nuevos desaf├¡os con confianza y solidez."
    ],
    "highlightsTitle": "Sobre la empresa",
    "highlights": [
      {
        "title": "Identidad",
        "description": "Integradora de tecnolog├¡as de automatizaci├│n de procesos.",
        "icon": "layers"
      },
      {
        "title": "Trayectoria",
        "description": "Or├¡genes desde 1993 con presencia regional.",
        "icon": "clock"
      },
      {
        "title": "Respaldo corporativo",
        "description": "Parte del Grupo Oeste en Argentina y Chile.",
        "icon": "building"
      },
      {
        "title": "Alcance",
        "description": "Implementaciones locales e internacionales.",
        "icon": "globe"
      },
      {
        "title": "Filosof├¡a",
        "description": "Capacitaci├│n continua y soporte de partners.",
        "icon": "users"
      },
      {
        "title": "Propuesta de valor",
        "description": "Desaf├¡os diarios con confianza y solidez.",
        "icon": "shield"
      }
    ]
  },
  "partners": {
    "title": "Nuestros aliados tecnol├│gicos",
    "subtitle": "Trabajamos con fabricantes globales y software especializado para entregar soluciones robustas y seguras.",
    "items": [
      {
        "name": "SEL",
        "href": "https://selinc.com",
        "description": "Schweitzer Engineering Laboratories. L├¡deres en protecci├│n, automatizaci├│n y control.",
        "image": "/images/partners/SEL.jpeg"
      },
      {
        "name": "Survalent",
        "href": "https://www.survalent.com/",
        "description": "Survalent Technology. SCADA avanzado para energ├¡a, miner├¡a, agua y distribuci├│n.",
        "image": "/images/partners/survalent.png"
      },
      {
        "name": "Systems With Intelligence",
        "href": "https://systemswithintelligence.com",
        "description": "Monitoreo y vigilancia para activos cr├¡ticos en tiempo real.",
        "image": "/images/partners/SWI.jpg"
      },
      {
        "name": "N3uron",
        "href": "https://n3uron.com",
        "description": "Conectividad industrial IoT y gesti├│n de datos.",
        "image": "/images/partners/N3uron-favicom-picture.jpg"
      }
    ]
  },
  "experience": {
    "title": "Portafolio de proyectos",
    "subtitle": "Resultados comprobados en energ├¡a, protecci├│n y automatizaci├│n de activos cr├¡ticos.",
    "cases": [
      {
        "client": "Cooperativa El├®ctrica de Godoy Cruz (Mendoza)",
        "work": "Ingenier├¡a de detalle de tableros de control.",
        "scope": "Supervisi├│n y comando de interruptores en playa de 132 kV."
      },
      {
        "client": "Hidroel├®ctrica Nihuiles S.A.",
        "work": "Ingenier├¡a de sistema de protecci├│n.",
        "scope": "Paneles para el conjunto Generador-Transformador (1 al 6) y protecci├│n de l├¡neas de transmisi├│n."
      }
    ]
  },
  "homeSection": {
    "title": "┬┐Qu├® hace LYNX?",
    "subtitle": "Activamos proyectos con foco en eficiencia, continuidad y crecimiento sostenible."
  },
  "homeBullets": [
    {
      "title": "Diagn├│stico experto",
      "description": "Levantamos requisitos cr├¡ticos y un plan claro en semanas."
    },
    {
      "title": "Ejecuci├│n integral",
      "description": "Integramos energ├¡a, software e infraestructura sin fricciones."
    },
    {
      "title": "Escalabilidad real",
      "description": "Arquitecturas preparadas para crecer sin deuda t├®cnica."
    }
  ],
  "homeCta": {
    "title": "┬┐Listo para despegar con LYNX?",
    "text": "Conversemos sobre tu desaf├¡o y dise├▒emos la soluci├│n ideal.",
    "buttonLabel": "Hablemos",
    "href": "/contacto"
  },
  "contactPage": {
    "title": "Contacto",
    "description": "Hablemos sobre tu proyecto. Recibimos tu mensaje y respondemos r├ípido.",
    "eyebrow": "Contacto",
    "heading": "Hablemos de tu pr├│ximo proyecto",
    "subtitle": "Completa el formulario y nuestro equipo te responde con una propuesta clara.",
    "form": {
      "nameLabel": "Nombre",
      "namePlaceholder": "Tu nombre",
      "nameErrorRequired": "Ingresa tu nombre.",
      "emailLabel": "Email",
      "emailPlaceholder": "tu@email.com",
      "emailErrorRequired": "Ingresa un email v├ílido.",
      "emailErrorAt": "El email debe incluir un @.",
      "messageLabel": "Mensaje",
      "messagePlaceholder": "Contanos sobre tu proyecto",
      "messageErrorMin": "Contanos un poco m├ís (m├¡n. 10 caracteres).",
      "submitLabel": "Enviar mensaje",
      "submittingLabel": "Enviando...",
      "statusError": "Revisa los campos marcados.",
      "statusSuccess": "Mensaje listo para enviar. Te respondemos pronto."
    }
  },
  "bot": {
    "buttonLabel": "BOT LYNX",
    "heading": "Hola, soy Lynx Bot.",
    "subheading": "D├®jame tus datos y un ingeniero te contactar├í.",
    "nameLabel": "Nombre",
    "namePlaceholder": "Tu nombre",
    "emailLabel": "Email",
    "emailPlaceholder": "tu@email.com",
    "messageLabel": "Mensaje",
    "messagePlaceholder": "Contanos sobre tu proyecto",
    "submitLabel": "Enviar solicitud",
    "submittingLabel": "Enviando...",
    "successMessage": "┬íRecibido! Nos pondremos en contacto pronto."
  }
}

ENERGIA:
{
  "meta": {
    "title": "Energ├¡a",
    "description": "Soluciones de energ├¡a para operaciones cr├¡ticas: eficiencia, resiliencia y control en tiempo real."
  },
  "hero": {
    "badge": "Vertical Energ├¡a",
    "title": "Energ├¡a confiable para operaciones cr├¡ticas",
    "subtitle": "Dise├▒amos infraestructura resiliente y eficiente para industrias que no pueden detenerse.",
    "claim": "Control, eficiencia y continuidad con foco en performance."
  },
  "sections": {
    "featuresTitle": "Capacidades clave",
    "featuresSubtitle": "Combinamos ingenier├¡a energ├®tica y control digital para optimizar cada operaci├│n.",
    "servicesTitle": "Servicios",
    "servicesSubtitle": "Soluciones integrales para el control y la calidad de la energ├¡a el├®ctrica.",
    "useCasesTitle": "Casos de uso",
    "useCasesSubtitle": "Soluciones dise├▒adas para entornos cr├¡ticos y exigentes.",
    "galleryTitle": "Infraestructura en im├ígenes",
    "gallerySubtitle": "Un vistazo a nuestras soluciones, operaciones y proyectos en energ├¡a.",
    "faqTitle": "Preguntas frecuentes de energ├¡a"
  },
  "features": [
    {
      "title": "Optimizaci├│n de consumo",
      "description": "Modelos predictivos y ajustes finos para reducir costos energ├®ticos.",
      "icon": "bolt"
    },
    {
      "title": "Gesti├│n de redes",
      "description": "Monitoreo centralizado con alertas y decisiones en tiempo real.",
      "icon": "grid"
    },
    {
      "title": "Resiliencia operativa",
      "description": "Dise├▒os redundantes y planes de continuidad cr├¡ticos.",
      "icon": "shield"
    },
    {
      "title": "Medici├│n inteligente",
      "description": "Telemetr├¡a avanzada con paneles listos para auditor├¡as.",
      "icon": "sensor"
    },
    {
      "title": "Integraci├│n OT/IT",
      "description": "Conectamos activos industriales con plataformas digitales.",
      "icon": "link"
    }
  ],
  "services": [
    {
      "title": "Automatismos de subestaciones",
      "description": "Ingenier├¡a, provisi├│n, integraci├│n y construcci├│n. Nos adaptamos al est├índar del cliente."
    },
    {
      "title": "Medici├│n y calidad de energ├¡a",
      "description": "Soluciones de hardware y software con amplio conocimiento del mercado de magnitudes el├®ctricas."
    },
    {
      "title": "Bancos de capacitores",
      "description": "Estrategias y algoritmos de control para regular el factor de potencia en distribuci├│n y transporte."
    },
    {
      "title": "Salas el├®ctricas",
      "description": "Provisiones a medida con envolventes est├índar o dise├▒os propios para usos especiales."
    },
    {
      "title": "Energ├¡as alternativas",
      "description": "Estudios de viabilidad para integrar y vender excedentes de energ├¡a a la red."
    },
    {
      "title": "Automatismos industriales",
      "description": "M├íximo aprovechamiento de recursos disponibles y eficiencia en producci├│n."
    }
  ],
  "useCases": [
    {
      "title": "Parques industriales",
      "description": "Energ├¡a estable para clusters con alta demanda simult├ínea."
    },
    {
      "title": "Centros log├¡sticos",
      "description": "Continuidad y respaldo para operaciones 24/7."
    },
    {
      "title": "Miner├¡a y recursos",
      "description": "Infraestructura robusta en entornos exigentes."
    },
    {
      "title": "Salud y laboratorios",
      "description": "Protecci├│n de equipos cr├¡ticos y datos sensibles."
    }
  ],
  "faqs": [
    {
      "question": "┬┐Cu├ínto tarda una auditor├¡a inicial?",
      "answer": "Dependiendo del tama├▒o de la operaci├│n, entre 2 y 4 semanas para un diagn├│stico accionable."
    },
    {
      "question": "┬┐Integran con sistemas existentes?",
      "answer": "S├¡. Priorizamos integraciones con infraestructura actual para acelerar resultados."
    },
    {
      "question": "┬┐Pueden acompa├▒ar la implementaci├│n?",
      "answer": "Incluimos gesti├│n de proyecto, puesta en marcha y monitoreo continuo."
    }
  ],
  "cta": {
    "title": "Llevemos tu operaci├│n a un nuevo nivel",
    "text": "Contanos tu desaf├¡o energ├®tico y dise├▒emos un plan a medida.",
    "buttonLabel": "Ir a contacto"
  }
}

TECNOLOGIA:
{
  "meta": {
    "title": "Tecnolog├¡a",
    "description": "Plataformas y soluciones digitales: apps, automatizaci├│n, IoT e integraciones seguras."
  },
  "hero": {
    "badge": "Vertical Tecnolog├¡a",
    "title": "Tecnolog├¡a que impulsa decisiones inteligentes",
    "subtitle": "Construimos plataformas y automatizaciones para operar con precisi├│n y velocidad.",
    "claim": "Ecosistemas conectados, datos ├║tiles y experiencias premium."
  },
  "sections": {
    "featuresTitle": "Capacidades clave",
    "featuresSubtitle": "Dise├▒amos ecosistemas digitales para acelerar el negocio y reducir fricciones.",
    "servicesTitle": "Servicios",
    "servicesSubtitle": "Equipos multidisciplinarios para construir, integrar y escalar plataformas.",
    "useCasesTitle": "Casos de uso",
    "useCasesSubtitle": "Soluciones digitales para operaciones conectadas y resultados medibles.",
    "faqTitle": "Preguntas frecuentes de tecnolog├¡a"
  },
  "features": [
    {
      "title": "Apps y portales",
      "description": "Experiencias digitales orientadas a performance y adopci├│n r├ípida.",
      "icon": "rocket"
    },
    {
      "title": "Automatizaci├│n",
      "description": "Flujos inteligentes que reducen tiempos operativos.",
      "icon": "cpu"
    },
    {
      "title": "IoT industrial",
      "description": "Sensores y telemetr├¡a para operaciones conectadas.",
      "icon": "sensor"
    },
    {
      "title": "Integraciones seguras",
      "description": "APIs, middleware y control de acceso robusto.",
      "icon": "link"
    },
    {
      "title": "Data en tiempo real",
      "description": "Dashboards con insights accionables y alertas.",
      "icon": "grid"
    }
  ],
  "services": [
    {
      "title": "Dise├▒o de producto",
      "description": "Discovery, UX/UI y prototipos listos para iterar."
    },
    {
      "title": "Desarrollo full-stack",
      "description": "Arquitectura moderna con foco en escalabilidad."
    },
    {
      "title": "Plataformas IoT",
      "description": "Gesti├│n de dispositivos, eventos y anal├¡tica."
    },
    {
      "title": "Integraciones empresariales",
      "description": "Conectores con ERPs, CRMs y sistemas legados."
    },
    {
      "title": "Automatizaci├│n inteligente",
      "description": "RPA + workflows para eliminar tareas repetitivas."
    },
    {
      "title": "Observabilidad",
      "description": "Monitoreo, logs y alertas con est├índares premium."
    }
  ],
  "useCases": [
    {
      "title": "Operaciones conectadas",
      "description": "Unificamos datos de campo y backoffice."
    },
    {
      "title": "Mantenimiento predictivo",
      "description": "Modelos que anticipan fallas y optimizan activos."
    },
    {
      "title": "Integraci├│n multi-sede",
      "description": "Sistemas sincronizados en operaciones distribuidas."
    },
    {
      "title": "Experiencias B2B",
      "description": "Portales y apps para clientes estrat├®gicos."
    }
  ],
  "faqs": [
    {
      "question": "┬┐Qu├® stack utilizan?",
      "answer": "Elegimos tecnolog├¡as modernas con foco en performance, seguridad y escalabilidad."
    },
    {
      "question": "┬┐Pueden integrarse con legacy?",
      "answer": "S├¡. Dise├▒amos integraciones seguras para convivir con sistemas existentes."
    },
    {
      "question": "┬┐C├│mo entregan el producto?",
      "answer": "Trabajamos por etapas con releases incrementales y m├®tricas claras."
    }
  ],
  "cta": {
    "title": "Potenciemos tu ecosistema digital",
    "text": "Contanos tu objetivo y armamos una hoja de ruta tecnol├│gica.",
    "buttonLabel": "Contactar"
  }
};

{"site":"{\n  \"name\": \"LYNX\",\n  \"company\": {\n    \"legalName\": \"LYNX SpA\",\n    \"group\": \"Grupo Oeste\"\n  },\n  \"tagline\": \"Energ├¡a y Tecnolog├¡a para soluciones modernas\",\n  \"description\": \"LYNX integra energ├¡a e innovaci├│n tecnol├│gica para acelerar operaciones cr├¡ticas con foco en performance y confiabilidad.\",\n  \"nav\": [\n    {\n      \"label\": \"Inicio\",\n      \"href\": \"/\"\n    },\n    {\n      \"label\": \"Energ├¡a\",\n      \"href\": \"/energia\"\n    },\n    {\n      \"label\": \"Tecnolog├¡a\",\n      \"href\": \"/tecnologia\"\n    },\n    {\n      \"label\": \"Recursos\",\n      \"href\": \"/recursos\"\n    },\n    {\n      \"label\": \"Contacto\",\n      \"href\": \"/contacto\"\n    }\n  ],\n  \"aria\": {\n    \"primaryNav\": \"Navegaci├│n principal\"\n  },\n  \"theme\": {\n    \"toggleLabel\": \"Modo\",\n    \"light\": \"Claro\",\n    \"dark\": \"Oscuro\"\n  },\n  \"contact\": {\n    \"email\": \"hola@lynx.com\",\n    \"mobile\": \"+56 9 6214 8623\",\n    \"phone\": \"+56 2 24054964\",\n    \"address\": \"Santiago, Chile\",\n    \"region\": \"Operaci├│n en Chile y Argentina\",\n    \"social\": [\n      {\n        \"label\": \"LinkedIn\",\n        \"href\": \"#\"\n      },\n      {\n        \"label\": \"X\",\n        \"href\": \"#\"\n      },\n      {\n        \"label\": \"Instagram\",\n        \"href\": \"#\"\n      }\n    ]\n  },\n  \"footer\": {\n    \"navTitle\": \"Navegaci├│n\",\n    \"contactTitle\": \"Contacto\",\n    \"rights\": \"Todos los derechos reservados.\"\n  },\n  \"homeHero\": {\n    \"badge\": \"Soluciones integradas\",\n    \"description\": \"Unimos ingenier├¡a energ├®tica y tecnolog├¡a aplicada para desplegar soluciones premium con impacto medible.\"\n  },\n  \"homeCards\": [\n    {\n      \"label\": \"Energ├¡a\",\n      \"title\": \"Infraestructura resiliente\",\n      \"description\": \"Optimizaci├│n de consumo, continuidad operativa y control en tiempo real.\",\n      \"cta\": \"Explorar Energ├¡a\",\n      \"href\": \"/energia\",\n      \"image\": \"/images/energia/placeholder.svg\"\n    },\n    {\n      \"label\": \"Tecnolog├¡a\",\n      \"title\": \"Plataformas inteligentes\",\n      \"description\": \"Apps, automatizaci├│n e integraciones seguras para decisiones r├ípidas.\",\n      \"cta\": \"Explorar Tecnolog├¡a\",\n      \"href\": \"/tecnologia\",\n      \"image\": \"/images/tecnologia/placeholder.svg\"\n    }\n  ],\n  \"about\": {\n    \"title\": \"Nosotros\",\n    \"subtitle\": \"LYNX SpA\",\n    \"cover\": {\n      \"image\": \"/images/brand/about.svg\",\n      \"alt\": \"Equipo LYNX en operaciones de energ├¡a\"\n    },\n    \"body\": [\n      \"Desde sus or├¡genes en el a├▒o 1993, LYNX SpA se ha consolidado como reconocida integradora de tecnolog├¡as de la automatizaci├│n de procesos, a trav├®s de la concreci├│n de m├║ltiples implementaciones satisfactorias en los m├ís diversos rubros de la industria, tanto en Argentina como en el exterior.\",\n      \"Si bien continuamos operando en todas las ramas de la industria, en los ├║ltimos a├▒os nos hemos focalizado en la provisi├│n de soluciones que involucran la energ├¡a el├®ctrica, desde diferentes puntos de vista.\",\n      \"A lo largo de nuestra trayectoria nos hemos adaptado a las cambiantes condiciones imperantes en los mercados que atendemos y a la vez hemos sabido mantener un estrecho di├ílogo con la vanguardia tecnol├│gica, algunas veces como proveedores solo de servicios y otras con provisi├│n de equipamiento, pero siempre defendiendo la consigna de alcanzar y superar los resultados esperados por nuestros clientes.\",\n      \"LYNX SpA se especializa en control de energ├¡a el├®ctrica como empresa proveedora de soluciones integrales a trav├®s de la comercializaci├│n de equipamiento el├®ctrico con tecnolog├¡a de vanguardia y los servicios de ingenier├¡a complementarios para su programaci├│n, instalaci├│n, puesta en servicio y explotaci├│n, destinados al mercado de la energ├¡a el├®ctrica en cualquiera de sus ├ímbitos de aplicaci├│n.\"\n    ],\n    \"teamTitle\": \"Portada Nosotros\",\n    \"teamBody\": [\n      \"Para lograr los objetivos en cada proyecto contamos, como socios estrat├®gicos, a fabricantes y proveedores, de trayectoria y reconocimiento de alcance global, con una cartera de soluciones ampliamente probadas que nos brindan su respaldo tecnol├│gico e institucional. Esto se traduce en un equipo con el m├ís elevado grado de compromiso, asumido en cada trabajo.\",\n      \"Nuestro equipo de profesionales est├í constituido por recursos humanos con una s├│lida formaci├│n en tecnolog├¡as de automatismos avanzados y una amplia trayectoria en integraciones en las ├íreas de control, medici├│n y protecci├│n de sistemas asociados a la energ├¡a el├®ctrica.\",\n      \"Las ├íreas de operaci├│n incluyen el personal id├│neo para acompa├▒ar nuestro producto, desde la concepci├│n del proyecto en sus etapas de ingenier├¡a conceptual y b├ísica, pasando por la definici├│n de materiales, la ingenier├¡a de detalle, hasta cubrir cada uno de los pasos siguientes arribando a la concreci├│n de la soluci├│n integral mediante la construcci├│n electromec├ínica, la programaci├│n y configuraci├│n de hardware, los ensayos en f├íbrica, los montajes en obra para concluir con los ensayos en sitio y la puesta en servicio.\",\n      \"La extensa experiencia de nuestro personal en proyectos el├®ctricos, unido a la capacitaci├│n continua en ├íreas espec├¡ficas, junto con el soporte de nuestros proveedores, nos permite encarar d├¡a a d├¡a nuevos desaf├¡os con confianza y solidez.\"\n    ],\n    \"highlightsTitle\": \"Sobre la empresa\",\n    \"highlights\": [\n      {\n        \"title\": \"Identidad\",\n        \"description\": \"Integradora de tecnolog├¡as de automatizaci├│n de procesos.\",\n        \"icon\": \"layers\"\n      },\n      {\n        \"title\": \"Trayectoria\",\n        \"description\": \"Or├¡genes desde 1993 con presencia regional.\",\n        \"icon\": \"clock\"\n      },\n      {\n        \"title\": \"Respaldo corporativo\",\n        \"description\": \"Parte del Grupo Oeste en Argentina y Chile.\",\n        \"icon\": \"building\"\n      },\n      {\n        \"title\": \"Alcance\",\n        \"description\": \"Implementaciones locales e internacionales.\",\n        \"icon\": \"globe\"\n      },\n      {\n        \"title\": \"Filosof├¡a\",\n        \"description\": \"Capacitaci├│n continua y soporte de partners.\",\n        \"icon\": \"users\"\n      },\n      {\n        \"title\": \"Propuesta de valor\",\n        \"description\": \"Desaf├¡os diarios con confianza y solidez.\",\n        \"icon\": \"shield\"\n      }\n    ]\n  },\n  \"partners\": {\n    \"title\": \"Nuestros aliados tecnol├│gicos\",\n    \"subtitle\": \"Trabajamos con fabricantes globales y software especializado para entregar soluciones robustas y seguras.\",\n    \"items\": [\n      {\n        \"name\": \"SEL\",\n        \"href\": \"https://selinc.com\",\n        \"description\": \"Schweitzer Engineering Laboratories. L├¡deres en protecci├│n, automatizaci├│n y control.\",\n        \"image\": \"/images/partners/SEL.jpeg\"\n      },\n      {\n        \"name\": \"Survalent\",\n        \"href\": \"https://www.survalent.com/\",\n        \"description\": \"Survalent Technology. SCADA avanzado para energ├¡a, miner├¡a, agua y distribuci├│n.\",\n        \"image\": \"/images/partners/survalent.png\"\n      },\n      {\n        \"name\": \"Systems With Intelligence\",\n        \"href\": \"https://systemswithintelligence.com\",\n        \"description\": \"Monitoreo y vigilancia para activos cr├¡ticos en tiempo real.\",\n        \"image\": \"/images/partners/SWI.jpg\"\n      },\n      {\n        \"name\": \"N3uron\",\n        \"href\": \"https://n3uron.com\",\n        \"description\": \"Conectividad industrial IoT y gesti├│n de datos.\",\n        \"image\": \"/images/partners/N3uron-favicom-picture.jpg\"\n      }\n    ]\n  },\n  \"experience\": {\n    \"title\": \"Portafolio de proyectos\",\n    \"subtitle\": \"Resultados comprobados en energ├¡a, protecci├│n y automatizaci├│n de activos cr├¡ticos.\",\n    \"cases\": [\n      {\n        \"client\": \"Cooperativa El├®ctrica de Godoy Cruz (Mendoza)\",\n        \"work\": \"Ingenier├¡a de detalle de tableros de control.\",\n        \"scope\": \"Supervisi├│n y comando de interruptores en playa de 132 kV.\"\n      },\n      {\n        \"client\": \"Hidroel├®ctrica Nihuiles S.A.\",\n        \"work\": \"Ingenier├¡a de sistema de protecci├│n.\",\n        \"scope\": \"Paneles para el conjunto Generador-Transformador (1 al 6) y protecci├│n de l├¡neas de transmisi├│n.\"\n      }\n    ]\n  },\n  \"homeSection\": {\n    \"title\": \"┬┐Qu├® hace LYNX?\",\n    \"subtitle\": \"Activamos proyectos con foco en eficiencia, continuidad y crecimiento sostenible.\"\n  },\n  \"homeBullets\": [\n    {\n      \"title\": \"Diagn├│stico experto\",\n      \"description\": \"Levantamos requisitos cr├¡ticos y un plan claro en semanas.\"\n    },\n    {\n      \"title\": \"Ejecuci├│n integral\",\n      \"description\": \"Integramos energ├¡a, software e infraestructura sin fricciones.\"\n    },\n    {\n      \"title\": \"Escalabilidad real\",\n      \"description\": \"Arquitecturas preparadas para crecer sin deuda t├®cnica.\"\n    }\n  ],\n  \"homeCta\": {\n    \"title\": \"┬┐Listo para despegar con LYNX?\",\n    \"text\": \"Conversemos sobre tu desaf├¡o y dise├▒emos la soluci├│n ideal.\",\n    \"buttonLabel\": \"Hablemos\",\n    \"href\": \"/contacto\"\n  },\n  \"contactPage\": {\n    \"title\": \"Contacto\",\n    \"description\": \"Hablemos sobre tu proyecto. Recibimos tu mensaje y respondemos r├ípido.\",\n    \"eyebrow\": \"Contacto\",\n    \"heading\": \"Hablemos de tu pr├│ximo proyecto\",\n    \"subtitle\": \"Completa el formulario y nuestro equipo te responde con una propuesta clara.\",\n    \"form\": {\n      \"nameLabel\": \"Nombre\",\n      \"namePlaceholder\": \"Tu nombre\",\n      \"nameErrorRequired\": \"Ingresa tu nombre.\",\n      \"emailLabel\": \"Email\",\n      \"emailPlaceholder\": \"tu@email.com\",\n      \"emailErrorRequired\": \"Ingresa un email v├ílido.\",\n      \"emailErrorAt\": \"El email debe incluir un @.\",\n      \"messageLabel\": \"Mensaje\",\n      \"messagePlaceholder\": \"Contanos sobre tu proyecto\",\n      \"messageErrorMin\": \"Contanos un poco m├ís (m├¡n. 10 caracteres).\",\n      \"submitLabel\": \"Enviar mensaje\",\n      \"submittingLabel\": \"Enviando...\",\n      \"statusError\": \"Revisa los campos marcados.\",\n      \"statusSuccess\": \"Mensaje listo para enviar. Te respondemos pronto.\"\n    }\n  },\n  \"bot\": {\n    \"buttonLabel\": \"BOT LYNX\",\n    \"heading\": \"Hola, soy Lynx Bot.\",\n    \"subheading\": \"D├®jame tus datos y un ingeniero te contactar├í.\",\n    \"nameLabel\": \"Nombre\",\n    \"namePlaceholder\": \"Tu nombre\",\n    \"emailLabel\": \"Email\",\n    \"emailPlaceholder\": \"tu@email.com\",\n    \"messageLabel\": \"Mensaje\",\n    \"messagePlaceholder\": \"Contanos sobre tu proyecto\",\n    \"submitLabel\": \"Enviar solicitud\",\n    \"submittingLabel\": \"Enviando...\",\n    \"successMessage\": \"┬íRecibido! Nos pondremos en contacto pronto.\"\n  }\n}","energia":"{\n  \"meta\": {\n    \"title\": \"Energ├¡a\",\n    \"description\": \"Soluciones de energ├¡a para operaciones cr├¡ticas: eficiencia, resiliencia y control en tiempo real.\"\n  },\n  \"hero\": {\n    \"badge\": \"Vertical Energ├¡a\",\n    \"title\": \"Energ├¡a confiable para operaciones cr├¡ticas\",\n    \"subtitle\": \"Dise├▒amos infraestructura resiliente y eficiente para industrias que no pueden detenerse.\",\n    \"claim\": \"Control, eficiencia y continuidad con foco en performance.\"\n  },\n  \"sections\": {\n    \"featuresTitle\": \"Capacidades clave\",\n    \"featuresSubtitle\": \"Combinamos ingenier├¡a energ├®tica y control digital para optimizar cada operaci├│n.\",\n    \"servicesTitle\": \"Servicios\",\n    \"servicesSubtitle\": \"Soluciones integrales para el control y la calidad de la energ├¡a el├®ctrica.\",\n    \"useCasesTitle\": \"Casos de uso\",\n    \"useCasesSubtitle\": \"Soluciones dise├▒adas para entornos cr├¡ticos y exigentes.\",\n    \"galleryTitle\": \"Infraestructura en im├ígenes\",\n    \"gallerySubtitle\": \"Un vistazo a nuestras soluciones, operaciones y proyectos en energ├¡a.\",\n    \"faqTitle\": \"Preguntas frecuentes de energ├¡a\"\n  },\n  \"features\": [\n    {\n      \"title\": \"Optimizaci├│n de consumo\",\n      \"description\": \"Modelos predictivos y ajustes finos para reducir costos energ├®ticos.\",\n      \"icon\": \"bolt\"\n    },\n    {\n      \"title\": \"Gesti├│n de redes\",\n      \"description\": \"Monitoreo centralizado con alertas y decisiones en tiempo real.\",\n      \"icon\": \"grid\"\n    },\n    {\n      \"title\": \"Resiliencia operativa\",\n      \"description\": \"Dise├▒os redundantes y planes de continuidad cr├¡ticos.\",\n      \"icon\": \"shield\"\n    },\n    {\n      \"title\": \"Medici├│n inteligente\",\n      \"description\": \"Telemetr├¡a avanzada con paneles listos para auditor├¡as.\",\n      \"icon\": \"sensor\"\n    },\n    {\n      \"title\": \"Integraci├│n OT/IT\",\n      \"description\": \"Conectamos activos industriales con plataformas digitales.\",\n      \"icon\": \"link\"\n    }\n  ],\n  \"services\": [\n    {\n      \"title\": \"Automatismos de subestaciones\",\n      \"description\": \"Ingenier├¡a, provisi├│n, integraci├│n y construcci├│n. Nos adaptamos al est├índar del cliente.\"\n    },\n    {\n      \"title\": \"Medici├│n y calidad de energ├¡a\",\n      \"description\": \"Soluciones de hardware y software con amplio conocimiento del mercado de magnitudes el├®ctricas.\"\n    },\n    {\n      \"title\": \"Bancos de capacitores\",\n      \"description\": \"Estrategias y algoritmos de control para regular el factor de potencia en distribuci├│n y transporte.\"\n    },\n    {\n      \"title\": \"Salas el├®ctricas\",\n      \"description\": \"Provisiones a medida con envolventes est├índar o dise├▒os propios para usos especiales.\"\n    },\n    {\n      \"title\": \"Energ├¡as alternativas\",\n      \"description\": \"Estudios de viabilidad para integrar y vender excedentes de energ├¡a a la red.\"\n    },\n    {\n      \"title\": \"Automatismos industriales\",\n      \"description\": \"M├íximo aprovechamiento de recursos disponibles y eficiencia en producci├│n.\"\n    }\n  ],\n  \"useCases\": [\n    {\n      \"title\": \"Parques industriales\",\n      \"description\": \"Energ├¡a estable para clusters con alta demanda simult├ínea.\"\n    },\n    {\n      \"title\": \"Centros log├¡sticos\",\n      \"description\": \"Continuidad y respaldo para operaciones 24/7.\"\n    },\n    {\n      \"title\": \"Miner├¡a y recursos\",\n      \"description\": \"Infraestructura robusta en entornos exigentes.\"\n    },\n    {\n      \"title\": \"Salud y laboratorios\",\n      \"description\": \"Protecci├│n de equipos cr├¡ticos y datos sensibles.\"\n    }\n  ],\n  \"faqs\": [\n    {\n      \"question\": \"┬┐Cu├ínto tarda una auditor├¡a inicial?\",\n      \"answer\": \"Dependiendo del tama├▒o de la operaci├│n, entre 2 y 4 semanas para un diagn├│stico accionable.\"\n    },\n    {\n      \"question\": \"┬┐Integran con sistemas existentes?\",\n      \"answer\": \"S├¡. Priorizamos integraciones con infraestructura actual para acelerar resultados.\"\n    },\n    {\n      \"question\": \"┬┐Pueden acompa├▒ar la implementaci├│n?\",\n      \"answer\": \"Incluimos gesti├│n de proyecto, puesta en marcha y monitoreo continuo.\"\n    }\n  ],\n  \"cta\": {\n    \"title\": \"Llevemos tu operaci├│n a un nuevo nivel\",\n    \"text\": \"Contanos tu desaf├¡o energ├®tico y dise├▒emos un plan a medida.\",\n    \"buttonLabel\": \"Ir a contacto\"\n  }\n}","tecnologia":"{\n  \"meta\": {\n    \"title\": \"Tecnolog├¡a\",\n    \"description\": \"Plataformas y soluciones digitales: apps, automatizaci├│n, IoT e integraciones seguras.\"\n  },\n  \"hero\": {\n    \"badge\": \"Vertical Tecnolog├¡a\",\n    \"title\": \"Tecnolog├¡a que impulsa decisiones inteligentes\",\n    \"subtitle\": \"Construimos plataformas y automatizaciones para operar con precisi├│n y velocidad.\",\n    \"claim\": \"Ecosistemas conectados, datos ├║tiles y experiencias premium.\"\n  },\n  \"sections\": {\n    \"featuresTitle\": \"Capacidades clave\",\n    \"featuresSubtitle\": \"Dise├▒amos ecosistemas digitales para acelerar el negocio y reducir fricciones.\",\n    \"servicesTitle\": \"Servicios\",\n    \"servicesSubtitle\": \"Equipos multidisciplinarios para construir, integrar y escalar plataformas.\",\n    \"useCasesTitle\": \"Casos de uso\",\n    \"useCasesSubtitle\": \"Soluciones digitales para operaciones conectadas y resultados medibles.\",\n    \"faqTitle\": \"Preguntas frecuentes de tecnolog├¡a\"\n  },\n  \"features\": [\n    {\n      \"title\": \"Apps y portales\",\n      \"description\": \"Experiencias digitales orientadas a performance y adopci├│n r├ípida.\",\n      \"icon\": \"rocket\"\n    },\n    {\n      \"title\": \"Automatizaci├│n\",\n      \"description\": \"Flujos inteligentes que reducen tiempos operativos.\",\n      \"icon\": \"cpu\"\n    },\n    {\n      \"title\": \"IoT industrial\",\n      \"description\": \"Sensores y telemetr├¡a para operaciones conectadas.\",\n      \"icon\": \"sensor\"\n    },\n    {\n      \"title\": \"Integraciones seguras\",\n      \"description\": \"APIs, middleware y control de acceso robusto.\",\n      \"icon\": \"link\"\n    },\n    {\n      \"title\": \"Data en tiempo real\",\n      \"description\": \"Dashboards con insights accionables y alertas.\",\n      \"icon\": \"grid\"\n    }\n  ],\n  \"services\": [\n    {\n      \"title\": \"Dise├▒o de producto\",\n      \"description\": \"Discovery, UX/UI y prototipos listos para iterar.\"\n    },\n    {\n      \"title\": \"Desarrollo full-stack\",\n      \"description\": \"Arquitectura moderna con foco en escalabilidad.\"\n    },\n    {\n      \"title\": \"Plataformas IoT\",\n      \"description\": \"Gesti├│n de dispositivos, eventos y anal├¡tica.\"\n    },\n    {\n      \"title\": \"Integraciones empresariales\",\n      \"description\": \"Conectores con ERPs, CRMs y sistemas legados.\"\n    },\n    {\n      \"title\": \"Automatizaci├│n inteligente\",\n      \"description\": \"RPA + workflows para eliminar tareas repetitivas.\"\n    },\n    {\n      \"title\": \"Observabilidad\",\n      \"description\": \"Monitoreo, logs y alertas con est├índares premium.\"\n    }\n  ],\n  \"useCases\": [\n    {\n      \"title\": \"Operaciones conectadas\",\n      \"description\": \"Unificamos datos de campo y backoffice.\"\n    },\n    {\n      \"title\": \"Mantenimiento predictivo\",\n      \"description\": \"Modelos que anticipan fallas y optimizan activos.\"\n    },\n    {\n      \"title\": \"Integraci├│n multi-sede\",\n      \"description\": \"Sistemas sincronizados en operaciones distribuidas.\"\n    },\n    {\n      \"title\": \"Experiencias B2B\",\n      \"description\": \"Portales y apps para clientes estrat├®gicos.\"\n    }\n  ],\n  \"faqs\": [\n    {\n      \"question\": \"┬┐Qu├® stack utilizan?\",\n      \"answer\": \"Elegimos tecnolog├¡as modernas con foco en performance, seguridad y escalabilidad.\"\n    },\n    {\n      \"question\": \"┬┐Pueden integrarse con legacy?\",\n      \"answer\": \"S├¡. Dise├▒amos integraciones seguras para convivir con sistemas existentes.\"\n    },\n    {\n      \"question\": \"┬┐C├│mo entregan el producto?\",\n      \"answer\": \"Trabajamos por etapas con releases incrementales y m├®tricas claras.\"\n    }\n  ],\n  \"cta\": {\n    \"title\": \"Potenciemos tu ecosistema digital\",\n    \"text\": \"Contanos tu objetivo y armamos una hoja de ruta tecnol├│gica.\",\n    \"buttonLabel\": \"Contactar\"\n  }\n}"} = json_encode([
  'model' => 'gpt-4o-mini',
  'messages' => array_merge(
    [[
      'role' => 'system',
      'content' => ,
    ]],
    
  ),
], JSON_UNESCAPED_UNICODE);

 = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt(, CURLOPT_RETURNTRANSFER, true);
curl_setopt(, CURLOPT_POST, true);
curl_setopt(, CURLOPT_HTTPHEADER, [
  'Content-Type: application/json',
  'Authorization: Bearer ' . ,
]);
curl_setopt(, CURLOPT_POSTFIELDS, {"site":"{\n  \"name\": \"LYNX\",\n  \"company\": {\n    \"legalName\": \"LYNX SpA\",\n    \"group\": \"Grupo Oeste\"\n  },\n  \"tagline\": \"Energ├¡a y Tecnolog├¡a para soluciones modernas\",\n  \"description\": \"LYNX integra energ├¡a e innovaci├│n tecnol├│gica para acelerar operaciones cr├¡ticas con foco en performance y confiabilidad.\",\n  \"nav\": [\n    {\n      \"label\": \"Inicio\",\n      \"href\": \"/\"\n    },\n    {\n      \"label\": \"Energ├¡a\",\n      \"href\": \"/energia\"\n    },\n    {\n      \"label\": \"Tecnolog├¡a\",\n      \"href\": \"/tecnologia\"\n    },\n    {\n      \"label\": \"Recursos\",\n      \"href\": \"/recursos\"\n    },\n    {\n      \"label\": \"Contacto\",\n      \"href\": \"/contacto\"\n    }\n  ],\n  \"aria\": {\n    \"primaryNav\": \"Navegaci├│n principal\"\n  },\n  \"theme\": {\n    \"toggleLabel\": \"Modo\",\n    \"light\": \"Claro\",\n    \"dark\": \"Oscuro\"\n  },\n  \"contact\": {\n    \"email\": \"hola@lynx.com\",\n    \"mobile\": \"+56 9 6214 8623\",\n    \"phone\": \"+56 2 24054964\",\n    \"address\": \"Santiago, Chile\",\n    \"region\": \"Operaci├│n en Chile y Argentina\",\n    \"social\": [\n      {\n        \"label\": \"LinkedIn\",\n        \"href\": \"#\"\n      },\n      {\n        \"label\": \"X\",\n        \"href\": \"#\"\n      },\n      {\n        \"label\": \"Instagram\",\n        \"href\": \"#\"\n      }\n    ]\n  },\n  \"footer\": {\n    \"navTitle\": \"Navegaci├│n\",\n    \"contactTitle\": \"Contacto\",\n    \"rights\": \"Todos los derechos reservados.\"\n  },\n  \"homeHero\": {\n    \"badge\": \"Soluciones integradas\",\n    \"description\": \"Unimos ingenier├¡a energ├®tica y tecnolog├¡a aplicada para desplegar soluciones premium con impacto medible.\"\n  },\n  \"homeCards\": [\n    {\n      \"label\": \"Energ├¡a\",\n      \"title\": \"Infraestructura resiliente\",\n      \"description\": \"Optimizaci├│n de consumo, continuidad operativa y control en tiempo real.\",\n      \"cta\": \"Explorar Energ├¡a\",\n      \"href\": \"/energia\",\n      \"image\": \"/images/energia/placeholder.svg\"\n    },\n    {\n      \"label\": \"Tecnolog├¡a\",\n      \"title\": \"Plataformas inteligentes\",\n      \"description\": \"Apps, automatizaci├│n e integraciones seguras para decisiones r├ípidas.\",\n      \"cta\": \"Explorar Tecnolog├¡a\",\n      \"href\": \"/tecnologia\",\n      \"image\": \"/images/tecnologia/placeholder.svg\"\n    }\n  ],\n  \"about\": {\n    \"title\": \"Nosotros\",\n    \"subtitle\": \"LYNX SpA\",\n    \"cover\": {\n      \"image\": \"/images/brand/about.svg\",\n      \"alt\": \"Equipo LYNX en operaciones de energ├¡a\"\n    },\n    \"body\": [\n      \"Desde sus or├¡genes en el a├▒o 1993, LYNX SpA se ha consolidado como reconocida integradora de tecnolog├¡as de la automatizaci├│n de procesos, a trav├®s de la concreci├│n de m├║ltiples implementaciones satisfactorias en los m├ís diversos rubros de la industria, tanto en Argentina como en el exterior.\",\n      \"Si bien continuamos operando en todas las ramas de la industria, en los ├║ltimos a├▒os nos hemos focalizado en la provisi├│n de soluciones que involucran la energ├¡a el├®ctrica, desde diferentes puntos de vista.\",\n      \"A lo largo de nuestra trayectoria nos hemos adaptado a las cambiantes condiciones imperantes en los mercados que atendemos y a la vez hemos sabido mantener un estrecho di├ílogo con la vanguardia tecnol├│gica, algunas veces como proveedores solo de servicios y otras con provisi├│n de equipamiento, pero siempre defendiendo la consigna de alcanzar y superar los resultados esperados por nuestros clientes.\",\n      \"LYNX SpA se especializa en control de energ├¡a el├®ctrica como empresa proveedora de soluciones integrales a trav├®s de la comercializaci├│n de equipamiento el├®ctrico con tecnolog├¡a de vanguardia y los servicios de ingenier├¡a complementarios para su programaci├│n, instalaci├│n, puesta en servicio y explotaci├│n, destinados al mercado de la energ├¡a el├®ctrica en cualquiera de sus ├ímbitos de aplicaci├│n.\"\n    ],\n    \"teamTitle\": \"Portada Nosotros\",\n    \"teamBody\": [\n      \"Para lograr los objetivos en cada proyecto contamos, como socios estrat├®gicos, a fabricantes y proveedores, de trayectoria y reconocimiento de alcance global, con una cartera de soluciones ampliamente probadas que nos brindan su respaldo tecnol├│gico e institucional. Esto se traduce en un equipo con el m├ís elevado grado de compromiso, asumido en cada trabajo.\",\n      \"Nuestro equipo de profesionales est├í constituido por recursos humanos con una s├│lida formaci├│n en tecnolog├¡as de automatismos avanzados y una amplia trayectoria en integraciones en las ├íreas de control, medici├│n y protecci├│n de sistemas asociados a la energ├¡a el├®ctrica.\",\n      \"Las ├íreas de operaci├│n incluyen el personal id├│neo para acompa├▒ar nuestro producto, desde la concepci├│n del proyecto en sus etapas de ingenier├¡a conceptual y b├ísica, pasando por la definici├│n de materiales, la ingenier├¡a de detalle, hasta cubrir cada uno de los pasos siguientes arribando a la concreci├│n de la soluci├│n integral mediante la construcci├│n electromec├ínica, la programaci├│n y configuraci├│n de hardware, los ensayos en f├íbrica, los montajes en obra para concluir con los ensayos en sitio y la puesta en servicio.\",\n      \"La extensa experiencia de nuestro personal en proyectos el├®ctricos, unido a la capacitaci├│n continua en ├íreas espec├¡ficas, junto con el soporte de nuestros proveedores, nos permite encarar d├¡a a d├¡a nuevos desaf├¡os con confianza y solidez.\"\n    ],\n    \"highlightsTitle\": \"Sobre la empresa\",\n    \"highlights\": [\n      {\n        \"title\": \"Identidad\",\n        \"description\": \"Integradora de tecnolog├¡as de automatizaci├│n de procesos.\",\n        \"icon\": \"layers\"\n      },\n      {\n        \"title\": \"Trayectoria\",\n        \"description\": \"Or├¡genes desde 1993 con presencia regional.\",\n        \"icon\": \"clock\"\n      },\n      {\n        \"title\": \"Respaldo corporativo\",\n        \"description\": \"Parte del Grupo Oeste en Argentina y Chile.\",\n        \"icon\": \"building\"\n      },\n      {\n        \"title\": \"Alcance\",\n        \"description\": \"Implementaciones locales e internacionales.\",\n        \"icon\": \"globe\"\n      },\n      {\n        \"title\": \"Filosof├¡a\",\n        \"description\": \"Capacitaci├│n continua y soporte de partners.\",\n        \"icon\": \"users\"\n      },\n      {\n        \"title\": \"Propuesta de valor\",\n        \"description\": \"Desaf├¡os diarios con confianza y solidez.\",\n        \"icon\": \"shield\"\n      }\n    ]\n  },\n  \"partners\": {\n    \"title\": \"Nuestros aliados tecnol├│gicos\",\n    \"subtitle\": \"Trabajamos con fabricantes globales y software especializado para entregar soluciones robustas y seguras.\",\n    \"items\": [\n      {\n        \"name\": \"SEL\",\n        \"href\": \"https://selinc.com\",\n        \"description\": \"Schweitzer Engineering Laboratories. L├¡deres en protecci├│n, automatizaci├│n y control.\",\n        \"image\": \"/images/partners/SEL.jpeg\"\n      },\n      {\n        \"name\": \"Survalent\",\n        \"href\": \"https://www.survalent.com/\",\n        \"description\": \"Survalent Technology. SCADA avanzado para energ├¡a, miner├¡a, agua y distribuci├│n.\",\n        \"image\": \"/images/partners/survalent.png\"\n      },\n      {\n        \"name\": \"Systems With Intelligence\",\n        \"href\": \"https://systemswithintelligence.com\",\n        \"description\": \"Monitoreo y vigilancia para activos cr├¡ticos en tiempo real.\",\n        \"image\": \"/images/partners/SWI.jpg\"\n      },\n      {\n        \"name\": \"N3uron\",\n        \"href\": \"https://n3uron.com\",\n        \"description\": \"Conectividad industrial IoT y gesti├│n de datos.\",\n        \"image\": \"/images/partners/N3uron-favicom-picture.jpg\"\n      }\n    ]\n  },\n  \"experience\": {\n    \"title\": \"Portafolio de proyectos\",\n    \"subtitle\": \"Resultados comprobados en energ├¡a, protecci├│n y automatizaci├│n de activos cr├¡ticos.\",\n    \"cases\": [\n      {\n        \"client\": \"Cooperativa El├®ctrica de Godoy Cruz (Mendoza)\",\n        \"work\": \"Ingenier├¡a de detalle de tableros de control.\",\n        \"scope\": \"Supervisi├│n y comando de interruptores en playa de 132 kV.\"\n      },\n      {\n        \"client\": \"Hidroel├®ctrica Nihuiles S.A.\",\n        \"work\": \"Ingenier├¡a de sistema de protecci├│n.\",\n        \"scope\": \"Paneles para el conjunto Generador-Transformador (1 al 6) y protecci├│n de l├¡neas de transmisi├│n.\"\n      }\n    ]\n  },\n  \"homeSection\": {\n    \"title\": \"┬┐Qu├® hace LYNX?\",\n    \"subtitle\": \"Activamos proyectos con foco en eficiencia, continuidad y crecimiento sostenible.\"\n  },\n  \"homeBullets\": [\n    {\n      \"title\": \"Diagn├│stico experto\",\n      \"description\": \"Levantamos requisitos cr├¡ticos y un plan claro en semanas.\"\n    },\n    {\n      \"title\": \"Ejecuci├│n integral\",\n      \"description\": \"Integramos energ├¡a, software e infraestructura sin fricciones.\"\n    },\n    {\n      \"title\": \"Escalabilidad real\",\n      \"description\": \"Arquitecturas preparadas para crecer sin deuda t├®cnica.\"\n    }\n  ],\n  \"homeCta\": {\n    \"title\": \"┬┐Listo para despegar con LYNX?\",\n    \"text\": \"Conversemos sobre tu desaf├¡o y dise├▒emos la soluci├│n ideal.\",\n    \"buttonLabel\": \"Hablemos\",\n    \"href\": \"/contacto\"\n  },\n  \"contactPage\": {\n    \"title\": \"Contacto\",\n    \"description\": \"Hablemos sobre tu proyecto. Recibimos tu mensaje y respondemos r├ípido.\",\n    \"eyebrow\": \"Contacto\",\n    \"heading\": \"Hablemos de tu pr├│ximo proyecto\",\n    \"subtitle\": \"Completa el formulario y nuestro equipo te responde con una propuesta clara.\",\n    \"form\": {\n      \"nameLabel\": \"Nombre\",\n      \"namePlaceholder\": \"Tu nombre\",\n      \"nameErrorRequired\": \"Ingresa tu nombre.\",\n      \"emailLabel\": \"Email\",\n      \"emailPlaceholder\": \"tu@email.com\",\n      \"emailErrorRequired\": \"Ingresa un email v├ílido.\",\n      \"emailErrorAt\": \"El email debe incluir un @.\",\n      \"messageLabel\": \"Mensaje\",\n      \"messagePlaceholder\": \"Contanos sobre tu proyecto\",\n      \"messageErrorMin\": \"Contanos un poco m├ís (m├¡n. 10 caracteres).\",\n      \"submitLabel\": \"Enviar mensaje\",\n      \"submittingLabel\": \"Enviando...\",\n      \"statusError\": \"Revisa los campos marcados.\",\n      \"statusSuccess\": \"Mensaje listo para enviar. Te respondemos pronto.\"\n    }\n  },\n  \"bot\": {\n    \"buttonLabel\": \"BOT LYNX\",\n    \"heading\": \"Hola, soy Lynx Bot.\",\n    \"subheading\": \"D├®jame tus datos y un ingeniero te contactar├í.\",\n    \"nameLabel\": \"Nombre\",\n    \"namePlaceholder\": \"Tu nombre\",\n    \"emailLabel\": \"Email\",\n    \"emailPlaceholder\": \"tu@email.com\",\n    \"messageLabel\": \"Mensaje\",\n    \"messagePlaceholder\": \"Contanos sobre tu proyecto\",\n    \"submitLabel\": \"Enviar solicitud\",\n    \"submittingLabel\": \"Enviando...\",\n    \"successMessage\": \"┬íRecibido! Nos pondremos en contacto pronto.\"\n  }\n}","energia":"{\n  \"meta\": {\n    \"title\": \"Energ├¡a\",\n    \"description\": \"Soluciones de energ├¡a para operaciones cr├¡ticas: eficiencia, resiliencia y control en tiempo real.\"\n  },\n  \"hero\": {\n    \"badge\": \"Vertical Energ├¡a\",\n    \"title\": \"Energ├¡a confiable para operaciones cr├¡ticas\",\n    \"subtitle\": \"Dise├▒amos infraestructura resiliente y eficiente para industrias que no pueden detenerse.\",\n    \"claim\": \"Control, eficiencia y continuidad con foco en performance.\"\n  },\n  \"sections\": {\n    \"featuresTitle\": \"Capacidades clave\",\n    \"featuresSubtitle\": \"Combinamos ingenier├¡a energ├®tica y control digital para optimizar cada operaci├│n.\",\n    \"servicesTitle\": \"Servicios\",\n    \"servicesSubtitle\": \"Soluciones integrales para el control y la calidad de la energ├¡a el├®ctrica.\",\n    \"useCasesTitle\": \"Casos de uso\",\n    \"useCasesSubtitle\": \"Soluciones dise├▒adas para entornos cr├¡ticos y exigentes.\",\n    \"galleryTitle\": \"Infraestructura en im├ígenes\",\n    \"gallerySubtitle\": \"Un vistazo a nuestras soluciones, operaciones y proyectos en energ├¡a.\",\n    \"faqTitle\": \"Preguntas frecuentes de energ├¡a\"\n  },\n  \"features\": [\n    {\n      \"title\": \"Optimizaci├│n de consumo\",\n      \"description\": \"Modelos predictivos y ajustes finos para reducir costos energ├®ticos.\",\n      \"icon\": \"bolt\"\n    },\n    {\n      \"title\": \"Gesti├│n de redes\",\n      \"description\": \"Monitoreo centralizado con alertas y decisiones en tiempo real.\",\n      \"icon\": \"grid\"\n    },\n    {\n      \"title\": \"Resiliencia operativa\",\n      \"description\": \"Dise├▒os redundantes y planes de continuidad cr├¡ticos.\",\n      \"icon\": \"shield\"\n    },\n    {\n      \"title\": \"Medici├│n inteligente\",\n      \"description\": \"Telemetr├¡a avanzada con paneles listos para auditor├¡as.\",\n      \"icon\": \"sensor\"\n    },\n    {\n      \"title\": \"Integraci├│n OT/IT\",\n      \"description\": \"Conectamos activos industriales con plataformas digitales.\",\n      \"icon\": \"link\"\n    }\n  ],\n  \"services\": [\n    {\n      \"title\": \"Automatismos de subestaciones\",\n      \"description\": \"Ingenier├¡a, provisi├│n, integraci├│n y construcci├│n. Nos adaptamos al est├índar del cliente.\"\n    },\n    {\n      \"title\": \"Medici├│n y calidad de energ├¡a\",\n      \"description\": \"Soluciones de hardware y software con amplio conocimiento del mercado de magnitudes el├®ctricas.\"\n    },\n    {\n      \"title\": \"Bancos de capacitores\",\n      \"description\": \"Estrategias y algoritmos de control para regular el factor de potencia en distribuci├│n y transporte.\"\n    },\n    {\n      \"title\": \"Salas el├®ctricas\",\n      \"description\": \"Provisiones a medida con envolventes est├índar o dise├▒os propios para usos especiales.\"\n    },\n    {\n      \"title\": \"Energ├¡as alternativas\",\n      \"description\": \"Estudios de viabilidad para integrar y vender excedentes de energ├¡a a la red.\"\n    },\n    {\n      \"title\": \"Automatismos industriales\",\n      \"description\": \"M├íximo aprovechamiento de recursos disponibles y eficiencia en producci├│n.\"\n    }\n  ],\n  \"useCases\": [\n    {\n      \"title\": \"Parques industriales\",\n      \"description\": \"Energ├¡a estable para clusters con alta demanda simult├ínea.\"\n    },\n    {\n      \"title\": \"Centros log├¡sticos\",\n      \"description\": \"Continuidad y respaldo para operaciones 24/7.\"\n    },\n    {\n      \"title\": \"Miner├¡a y recursos\",\n      \"description\": \"Infraestructura robusta en entornos exigentes.\"\n    },\n    {\n      \"title\": \"Salud y laboratorios\",\n      \"description\": \"Protecci├│n de equipos cr├¡ticos y datos sensibles.\"\n    }\n  ],\n  \"faqs\": [\n    {\n      \"question\": \"┬┐Cu├ínto tarda una auditor├¡a inicial?\",\n      \"answer\": \"Dependiendo del tama├▒o de la operaci├│n, entre 2 y 4 semanas para un diagn├│stico accionable.\"\n    },\n    {\n      \"question\": \"┬┐Integran con sistemas existentes?\",\n      \"answer\": \"S├¡. Priorizamos integraciones con infraestructura actual para acelerar resultados.\"\n    },\n    {\n      \"question\": \"┬┐Pueden acompa├▒ar la implementaci├│n?\",\n      \"answer\": \"Incluimos gesti├│n de proyecto, puesta en marcha y monitoreo continuo.\"\n    }\n  ],\n  \"cta\": {\n    \"title\": \"Llevemos tu operaci├│n a un nuevo nivel\",\n    \"text\": \"Contanos tu desaf├¡o energ├®tico y dise├▒emos un plan a medida.\",\n    \"buttonLabel\": \"Ir a contacto\"\n  }\n}","tecnologia":"{\n  \"meta\": {\n    \"title\": \"Tecnolog├¡a\",\n    \"description\": \"Plataformas y soluciones digitales: apps, automatizaci├│n, IoT e integraciones seguras.\"\n  },\n  \"hero\": {\n    \"badge\": \"Vertical Tecnolog├¡a\",\n    \"title\": \"Tecnolog├¡a que impulsa decisiones inteligentes\",\n    \"subtitle\": \"Construimos plataformas y automatizaciones para operar con precisi├│n y velocidad.\",\n    \"claim\": \"Ecosistemas conectados, datos ├║tiles y experiencias premium.\"\n  },\n  \"sections\": {\n    \"featuresTitle\": \"Capacidades clave\",\n    \"featuresSubtitle\": \"Dise├▒amos ecosistemas digitales para acelerar el negocio y reducir fricciones.\",\n    \"servicesTitle\": \"Servicios\",\n    \"servicesSubtitle\": \"Equipos multidisciplinarios para construir, integrar y escalar plataformas.\",\n    \"useCasesTitle\": \"Casos de uso\",\n    \"useCasesSubtitle\": \"Soluciones digitales para operaciones conectadas y resultados medibles.\",\n    \"faqTitle\": \"Preguntas frecuentes de tecnolog├¡a\"\n  },\n  \"features\": [\n    {\n      \"title\": \"Apps y portales\",\n      \"description\": \"Experiencias digitales orientadas a performance y adopci├│n r├ípida.\",\n      \"icon\": \"rocket\"\n    },\n    {\n      \"title\": \"Automatizaci├│n\",\n      \"description\": \"Flujos inteligentes que reducen tiempos operativos.\",\n      \"icon\": \"cpu\"\n    },\n    {\n      \"title\": \"IoT industrial\",\n      \"description\": \"Sensores y telemetr├¡a para operaciones conectadas.\",\n      \"icon\": \"sensor\"\n    },\n    {\n      \"title\": \"Integraciones seguras\",\n      \"description\": \"APIs, middleware y control de acceso robusto.\",\n      \"icon\": \"link\"\n    },\n    {\n      \"title\": \"Data en tiempo real\",\n      \"description\": \"Dashboards con insights accionables y alertas.\",\n      \"icon\": \"grid\"\n    }\n  ],\n  \"services\": [\n    {\n      \"title\": \"Dise├▒o de producto\",\n      \"description\": \"Discovery, UX/UI y prototipos listos para iterar.\"\n    },\n    {\n      \"title\": \"Desarrollo full-stack\",\n      \"description\": \"Arquitectura moderna con foco en escalabilidad.\"\n    },\n    {\n      \"title\": \"Plataformas IoT\",\n      \"description\": \"Gesti├│n de dispositivos, eventos y anal├¡tica.\"\n    },\n    {\n      \"title\": \"Integraciones empresariales\",\n      \"description\": \"Conectores con ERPs, CRMs y sistemas legados.\"\n    },\n    {\n      \"title\": \"Automatizaci├│n inteligente\",\n      \"description\": \"RPA + workflows para eliminar tareas repetitivas.\"\n    },\n    {\n      \"title\": \"Observabilidad\",\n      \"description\": \"Monitoreo, logs y alertas con est├índares premium.\"\n    }\n  ],\n  \"useCases\": [\n    {\n      \"title\": \"Operaciones conectadas\",\n      \"description\": \"Unificamos datos de campo y backoffice.\"\n    },\n    {\n      \"title\": \"Mantenimiento predictivo\",\n      \"description\": \"Modelos que anticipan fallas y optimizan activos.\"\n    },\n    {\n      \"title\": \"Integraci├│n multi-sede\",\n      \"description\": \"Sistemas sincronizados en operaciones distribuidas.\"\n    },\n    {\n      \"title\": \"Experiencias B2B\",\n      \"description\": \"Portales y apps para clientes estrat├®gicos.\"\n    }\n  ],\n  \"faqs\": [\n    {\n      \"question\": \"┬┐Qu├® stack utilizan?\",\n      \"answer\": \"Elegimos tecnolog├¡as modernas con foco en performance, seguridad y escalabilidad.\"\n    },\n    {\n      \"question\": \"┬┐Pueden integrarse con legacy?\",\n      \"answer\": \"S├¡. Dise├▒amos integraciones seguras para convivir con sistemas existentes.\"\n    },\n    {\n      \"question\": \"┬┐C├│mo entregan el producto?\",\n      \"answer\": \"Trabajamos por etapas con releases incrementales y m├®tricas claras.\"\n    }\n  ],\n  \"cta\": {\n    \"title\": \"Potenciemos tu ecosistema digital\",\n    \"text\": \"Contanos tu objetivo y armamos una hoja de ruta tecnol├│gica.\",\n    \"buttonLabel\": \"Contactar\"\n  }\n}"});

 = curl_exec();
 = curl_getinfo(, CURLINFO_HTTP_CODE);
 = curl_error();

curl_close();

if ( === false ||  >= 400) {
  http_response_code(500);
  echo json_encode([
    'response' => 'Ocurrió un error al procesar tu solicitud.',
    'error' => ,
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

 = json_decode(, true);
 = '';
if (isset(['choices'][0]['message']['content'])) {
   = trim(['choices'][0]['message']['content']);
}

echo json_encode(['response' => ], JSON_UNESCAPED_UNICODE);
