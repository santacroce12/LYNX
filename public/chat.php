<?php
header('Content-Type: application/json; charset=utf-8');

// Reemplaza por tu API Key de OpenAI o carga desde un entorno seguro.
$apiKey = 'sk-...';

if (!$apiKey || $apiKey === 'sk-...') {
  http_response_code(500);
  echo json_encode(["response" => "API key no configurada."], JSON_UNESCAPED_UNICODE);
  exit;
}

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);
$messages = isset($payload['messages']) && is_array($payload['messages']) ? $payload['messages'] : [];

$cleanMessages = [];
foreach ($messages as $message) {
  if (!isset($message['content'])) {
    continue;
  }
  $role = ($message['role'] ?? 'user') === 'assistant' ? 'assistant' : 'user';
  $cleanMessages[] = [
    'role' => $role,
    'content' => strval($message['content']),
  ];
}

$context = <<<'CONTEXT'
SITE:
{
  "name": "LYNX",
  "company": {
    "legalName": "LYNX SpA",
    "group": "Grupo Oeste"
  },
  "tagline": "Energía y Tecnología para soluciones modernas",
  "description": "LYNX integra energía e innovación tecnológica para acelerar operaciones críticas con foco en performance y confiabilidad.",
  "nav": [
    {
      "label": "Inicio",
      "href": "/"
    },
    {
      "label": "Energía",
      "href": "/energia"
    },
    {
      "label": "Tecnología",
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
    "primaryNav": "Navegación principal"
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
    "region": "Operación en Chile y Argentina",
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
    "navTitle": "Navegación",
    "contactTitle": "Contacto",
    "rights": "Todos los derechos reservados."
  },
  "homeHero": {
    "badge": "Soluciones integradas",
    "description": "Unimos ingeniería energética y tecnología aplicada para desplegar soluciones premium con impacto medible."
  },
  "homeCards": [
    {
      "label": "Energía",
      "title": "Infraestructura resiliente",
      "description": "Optimización de consumo, continuidad operativa y control en tiempo real.",
      "cta": "Explorar Energía",
      "href": "/energia",
      "image": "/images/energia/electrico.jpg"
    },
    {
      "label": "Tecnología",
      "title": "Plataformas inteligentes",
      "description": "Apps, automatización e integraciones seguras para decisiones rápidas.",
      "cta": "Explorar Tecnología",
      "href": "/tecnologia",
      "image": "/images/tecnologia/tecnologico.jpg"
    }
  ],
  "about": {
    "title": "Nosotros",
    "subtitle": "LYNX SpA",
    "cover": {
      "image": "/images/brand/about.svg",
      "alt": "Equipo LYNX en operaciones de energía"
    },
    "body": [
      "Desde sus orígenes en el año 1993, LYNX SpA se ha consolidado como reconocida integradora de tecnologías de la automatización de procesos, a través de la concreción de múltiples implementaciones satisfactorias en los más diversos rubros de la industria, tanto en Argentina como en el exterior.",
      "Si bien continuamos operando en todas las ramas de la industria, en los últimos años nos hemos focalizado en la provisión de soluciones que involucran la energía eléctrica, desde diferentes puntos de vista.",
      "A lo largo de nuestra trayectoria nos hemos adaptado a las cambiantes condiciones imperantes en los mercados que atendemos y a la vez hemos sabido mantener un estrecho diálogo con la vanguardia tecnológica, algunas veces como proveedores solo de servicios y otras con provisión de equipamiento, pero siempre defendiendo la consigna de alcanzar y superar los resultados esperados por nuestros clientes.",
      "LYNX SpA se especializa en control de energía eléctrica como empresa proveedora de soluciones integrales a través de la comercialización de equipamiento eléctrico con tecnología de vanguardia y los servicios de ingeniería complementarios para su programación, instalación, puesta en servicio y explotación, destinados al mercado de la energía eléctrica en cualquiera de sus ámbitos de aplicación."
    ],
    "teamTitle": "Portada Nosotros",
    "teamBody": [
      "Para lograr los objetivos en cada proyecto contamos, como socios estratégicos, a fabricantes y proveedores, de trayectoria y reconocimiento de alcance global, con una cartera de soluciones ampliamente probadas que nos brindan su respaldo tecnológico e institucional. Esto se traduce en un equipo con el más elevado grado de compromiso, asumido en cada trabajo.",
      "Nuestro equipo de profesionales está constituido por recursos humanos con una sólida formación en tecnologías de automatismos avanzados y una amplia trayectoria en integraciones en las áreas de control, medición y protección de sistemas asociados a la energía eléctrica.",
      "Las áreas de operación incluyen el personal idóneo para acompañar nuestro producto, desde la concepción del proyecto en sus etapas de ingeniería conceptual y básica, pasando por la definición de materiales, la ingeniería de detalle, hasta cubrir cada uno de los pasos siguientes arribando a la concreción de la solución integral mediante la construcción electromecánica, la programación y configuración de hardware, los ensayos en fábrica, los montajes en obra para concluir con los ensayos en sitio y la puesta en servicio.",
      "La extensa experiencia de nuestro personal en proyectos eléctricos, unido a la capacitación continua en áreas específicas, junto con el soporte de nuestros proveedores, nos permite encarar día a día nuevos desafíos con confianza y solidez."
    ],
    "highlightsTitle": "Sobre la empresa",
    "highlights": [
      {
        "title": "Identidad",
        "description": "Integradora de tecnologías de automatización de procesos.",
        "icon": "layers"
      },
      {
        "title": "Trayectoria",
        "description": "Orígenes desde 1993 con presencia regional.",
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
        "title": "Filosofía",
        "description": "Capacitación continua y soporte de partners.",
        "icon": "users"
      },
      {
        "title": "Propuesta de valor",
        "description": "Desafíos diarios con confianza y solidez.",
        "icon": "shield"
      }
    ]
  },
  "partners": {
    "title": "Nuestros aliados tecnológicos",
    "subtitle": "Trabajamos con fabricantes globales y software especializado para entregar soluciones robustas y seguras.",
    "items": [
      {
        "name": "SEL",
        "href": "https://selinc.com",
        "description": "Schweitzer Engineering Laboratories. Líderes en protección, automatización y control.",
        "image": "/images/partners/SEL.jpeg"
      },
      {
        "name": "Survalent",
        "href": "https://www.survalent.com/",
        "description": "Survalent Technology. SCADA avanzado para energía, minería, agua y distribución.",
        "image": "/images/partners/survalent.png"
      },
      {
        "name": "Systems With Intelligence",
        "href": "https://systemswithintelligence.com",
        "description": "Monitoreo y vigilancia para activos críticos en tiempo real.",
        "image": "/images/partners/SWI.jpg"
      },
      {
        "name": "N3uron",
        "href": "https://n3uron.com",
        "description": "Conectividad industrial IoT y gestión de datos.",
        "image": "/images/partners/N3uron-favicom-picture.jpg"
      }
    ]
  },
  "experience": {
    "title": "Portafolio de proyectos",
    "subtitle": "Resultados comprobados en energía, protección y automatización de activos críticos.",
    "cases": [
      {
        "client": "Cooperativa Eléctrica de Godoy Cruz (Mendoza)",
        "work": "Ingeniería de detalle de tableros de control.",
        "scope": "Supervisión y comando de interruptores en playa de 132 kV."
      },
      {
        "client": "Hidroeléctrica Nihuiles S.A.",
        "work": "Ingeniería de sistema de protección.",
        "scope": "Paneles para el conjunto Generador-Transformador (1 al 6) y protección de líneas de transmisión."
      }
    ]
  },
  "homeSection": {
    "title": "¿Qué hace LYNX?",
    "subtitle": "Activamos proyectos con foco en eficiencia, continuidad y crecimiento sostenible."
  },
  "homeBullets": [
    {
      "title": "Diagnóstico experto",
      "description": "Levantamos requisitos críticos y un plan claro en semanas."
    },
    {
      "title": "Ejecución integral",
      "description": "Integramos energía, software e infraestructura sin fricciones."
    },
    {
      "title": "Escalabilidad real",
      "description": "Arquitecturas preparadas para crecer sin deuda técnica."
    }
  ],
  "homeCta": {
    "title": "¿Listo para despegar con LYNX?",
    "text": "Conversemos sobre tu desafío y diseñemos la solución ideal.",
    "buttonLabel": "Hablemos",
    "href": "/contacto"
  },
  "contactPage": {
    "title": "Contacto",
    "description": "Hablemos sobre tu proyecto. Recibimos tu mensaje y respondemos rápido.",
    "eyebrow": "Contacto",
    "heading": "Hablemos de tu próximo proyecto",
    "subtitle": "Completa el formulario y nuestro equipo te responde con una propuesta clara.",
    "form": {
      "nameLabel": "Nombre",
      "namePlaceholder": "Tu nombre",
      "nameErrorRequired": "Ingresa tu nombre.",
      "emailLabel": "Email",
      "emailPlaceholder": "tu@email.com",
      "emailErrorRequired": "Ingresa un email válido.",
      "emailErrorAt": "El email debe incluir un @.",
      "messageLabel": "Mensaje",
      "messagePlaceholder": "Contanos sobre tu proyecto",
      "messageErrorMin": "Contanos un poco más (mín. 10 caracteres).",
      "submitLabel": "Enviar mensaje",
      "submittingLabel": "Enviando...",
      "statusError": "Revisa los campos marcados.",
      "statusSuccess": "Mensaje listo para enviar. Te respondemos pronto."
    }
  },
  "bot": {
    "buttonLabel": "BOT LYNX",
    "heading": "Hola, soy Lynx Bot.",
    "subheading": "Déjame tus datos y un ingeniero te contactará.",
    "nameLabel": "Nombre",
    "namePlaceholder": "Tu nombre",
    "emailLabel": "Email",
    "emailPlaceholder": "tu@email.com",
    "messageLabel": "Mensaje",
    "messagePlaceholder": "Contanos sobre tu proyecto",
    "submitLabel": "Enviar solicitud",
    "submittingLabel": "Enviando...",
    "successMessage": "¡Recibido! Nos pondremos en contacto pronto."
  }
}

ENERGIA:
{
  "meta": {
    "title": "Energía",
    "description": "Soluciones de energía para operaciones críticas: eficiencia, resiliencia y control en tiempo real."
  },
  "hero": {
    "badge": "Vertical Energía",
    "title": "Energía confiable para operaciones críticas",
    "subtitle": "Diseñamos infraestructura resiliente y eficiente para industrias que no pueden detenerse.",
    "claim": "Control, eficiencia y continuidad con foco en performance."
  },
  "sections": {
    "featuresTitle": "Capacidades clave",
    "featuresSubtitle": "Combinamos ingeniería energética y control digital para optimizar cada operación.",
    "servicesTitle": "Servicios",
    "servicesSubtitle": "Soluciones integrales para el control y la calidad de la energía eléctrica.",
    "useCasesTitle": "Casos de uso",
    "useCasesSubtitle": "Soluciones diseñadas para entornos críticos y exigentes.",
    "galleryTitle": "Infraestructura en imágenes",
    "gallerySubtitle": "Un vistazo a nuestras soluciones, operaciones y proyectos en energía.",
    "faqTitle": "Preguntas frecuentes de energía"
  },
  "features": [
    {
      "title": "Optimización de consumo",
      "description": "Modelos predictivos y ajustes finos para reducir costos energéticos.",
      "icon": "bolt"
    },
    {
      "title": "Gestión de redes",
      "description": "Monitoreo centralizado con alertas y decisiones en tiempo real.",
      "icon": "grid"
    },
    {
      "title": "Resiliencia operativa",
      "description": "Diseños redundantes y planes de continuidad críticos.",
      "icon": "shield"
    },
    {
      "title": "Medición inteligente",
      "description": "Telemetría avanzada con paneles listos para auditorías.",
      "icon": "sensor"
    },
    {
      "title": "Integración OT/IT",
      "description": "Conectamos activos industriales con plataformas digitales.",
      "icon": "link"
    }
  ],
  "services": [
    {
      "title": "Automatismos de subestaciones",
      "description": "Ingeniería, provisión, integración y construcción. Nos adaptamos al estándar del cliente."
    },
    {
      "title": "Medición y calidad de energía",
      "description": "Soluciones de hardware y software con amplio conocimiento del mercado de magnitudes eléctricas."
    },
    {
      "title": "Bancos de capacitores",
      "description": "Estrategias y algoritmos de control para regular el factor de potencia en distribución y transporte."
    },
    {
      "title": "Salas eléctricas",
      "description": "Provisiones a medida con envolventes estándar o diseños propios para usos especiales."
    },
    {
      "title": "Energías alternativas",
      "description": "Estudios de viabilidad para integrar y vender excedentes de energía a la red."
    },
    {
      "title": "Automatismos industriales",
      "description": "Máximo aprovechamiento de recursos disponibles y eficiencia en producción."
    }
  ],
  "useCases": [
    {
      "title": "Parques industriales",
      "description": "Energía estable para clusters con alta demanda simultánea."
    },
    {
      "title": "Centros logísticos",
      "description": "Continuidad y respaldo para operaciones 24/7."
    },
    {
      "title": "Minería y recursos",
      "description": "Infraestructura robusta en entornos exigentes."
    },
    {
      "title": "Salud y laboratorios",
      "description": "Protección de equipos críticos y datos sensibles."
    }
  ],
  "faqs": [
    {
      "question": "¿Cuánto tarda una auditoría inicial?",
      "answer": "Dependiendo del tamaño de la operación, entre 2 y 4 semanas para un diagnóstico accionable."
    },
    {
      "question": "¿Integran con sistemas existentes?",
      "answer": "Sí. Priorizamos integraciones con infraestructura actual para acelerar resultados."
    },
    {
      "question": "¿Pueden acompañar la implementación?",
      "answer": "Incluimos gestión de proyecto, puesta en marcha y monitoreo continuo."
    }
  ],
  "cta": {
    "title": "Llevemos tu operación a un nuevo nivel",
    "text": "Contanos tu desafío energético y diseñemos un plan a medida.",
    "buttonLabel": "Ir a contacto"
  }
}

TECNOLOGIA:
{
  "meta": {
    "title": "Tecnología",
    "description": "Plataformas y soluciones digitales: apps, automatización, IoT e integraciones seguras."
  },
  "hero": {
    "badge": "Vertical Tecnología",
    "title": "Tecnología que impulsa decisiones inteligentes",
    "subtitle": "Construimos plataformas y automatizaciones para operar con precisión y velocidad.",
    "claim": "Ecosistemas conectados, datos útiles y experiencias premium."
  },
  "sections": {
    "featuresTitle": "Capacidades clave",
    "featuresSubtitle": "Diseñamos ecosistemas digitales para acelerar el negocio y reducir fricciones.",
    "servicesTitle": "Servicios",
    "servicesSubtitle": "Equipos multidisciplinarios para construir, integrar y escalar plataformas.",
    "useCasesTitle": "Casos de uso",
    "useCasesSubtitle": "Soluciones digitales para operaciones conectadas y resultados medibles.",
    "faqTitle": "Preguntas frecuentes de tecnología"
  },
  "features": [
    {
      "title": "Apps y portales",
      "description": "Experiencias digitales orientadas a performance y adopción rápida.",
      "icon": "rocket"
    },
    {
      "title": "Automatización",
      "description": "Flujos inteligentes que reducen tiempos operativos.",
      "icon": "cpu"
    },
    {
      "title": "IoT industrial",
      "description": "Sensores y telemetría para operaciones conectadas.",
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
      "title": "Diseño de producto",
      "description": "Discovery, UX/UI y prototipos listos para iterar."
    },
    {
      "title": "Desarrollo full-stack",
      "description": "Arquitectura moderna con foco en escalabilidad."
    },
    {
      "title": "Plataformas IoT",
      "description": "Gestión de dispositivos, eventos y analítica."
    },
    {
      "title": "Integraciones empresariales",
      "description": "Conectores con ERPs, CRMs y sistemas legados."
    },
    {
      "title": "Automatización inteligente",
      "description": "RPA + workflows para eliminar tareas repetitivas."
    },
    {
      "title": "Observabilidad",
      "description": "Monitoreo, logs y alertas con estándares premium."
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
      "title": "Integración multi-sede",
      "description": "Sistemas sincronizados en operaciones distribuidas."
    },
    {
      "title": "Experiencias B2B",
      "description": "Portales y apps para clientes estratégicos."
    }
  ],
  "faqs": [
    {
      "question": "¿Qué stack utilizan?",
      "answer": "Elegimos tecnologías modernas con foco en performance, seguridad y escalabilidad."
    },
    {
      "question": "¿Pueden integrarse con legacy?",
      "answer": "Sí. Diseñamos integraciones seguras para convivir con sistemas existentes."
    },
    {
      "question": "¿Cómo entregan el producto?",
      "answer": "Trabajamos por etapas con releases incrementales y métricas claras."
    }
  ],
  "cta": {
    "title": "Potenciemos tu ecosistema digital",
    "text": "Contanos tu objetivo y armamos una hoja de ruta tecnológica.",
    "buttonLabel": "Contactar"
  }
}
CONTEXT;

$systemPrompt = <<<'PROMPT'
Eres LYNX Bot, un asistente ?til.
- Usa el CONTEXTO provisto para responder dudas.
- SI EL USUARIO QUIERE CONTACTAR/COTIZAR:
  1. P?dele amablemente su NOMBRE.
  2. Luego, p?dele su EMAIL.
  3. Finalmente, p?dele un MENSAJE o motivo breve.
  4. CUANDO TENGAS LOS 3 DATOS (Nombre, Email, Mensaje):
     NO respondas con texto normal. Responde ?NICAMENTE con este bloque JSON exacto:
     {
       "action": "submit_contact",
       "data": {
         "name": "el nombre aqui",
         "email": "el email aqui",
         "message": "el mensaje aqui"
       }
     }
PROMPT;

$messagesForApi = array_merge([
  [
    'role' => 'system',
    'content' => "CONTEXTO:
" . $context . "

INSTRUCCIONES:
" . $systemPrompt,
  ],
], $cleanMessages);

$requestBody = json_encode([
  'model' => 'gpt-4o-mini',
  'messages' => $messagesForApi,
  'temperature' => 0.3,
], JSON_UNESCAPED_UNICODE);

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey,
  ],
  CURLOPT_POSTFIELDS => $requestBody,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

if ($response === false || $httpCode >= 400) {
  http_response_code(500);
  echo json_encode([
    'response' => 'Ocurri? un error al procesar tu solicitud.',
    'error' => $curlError,
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

$data = json_decode($response, true);
$reply = '';
if (isset($data['choices'][0]['message']['content'])) {
  $reply = trim($data['choices'][0]['message']['content']);
}

echo json_encode(['response' => $reply], JSON_UNESCAPED_UNICODE);
