# Qué aportan los partners a LYNX

> Borrador de trabajo para revisión interna. Investigación actualizada al 20 de junio de 2026.

## Resumen ejecutivo

LYNX no aporta valor por revender productos aislados. Su diferencial está en combinar tecnologías especializadas con ingeniería, integración, despliegue en terreno, commissioning y soporte para operaciones críticas.

Los partners publicados actualmente cubren una cadena tecnológica complementaria:

- **SEL:** protección, automatización y control eléctrico.
- **Survalent:** operación de redes mediante SCADA y ADMS.
- **Systems With Intelligence (SWI):** monitoreo térmico y visual continuo de activos críticos.
- **N3uron:** conectividad industrial, Edge, IIoT y gestión de datos OT/IT.
- **Cisco:** redes industriales y ciberseguridad OT.
- **SISCO:** interoperabilidad eléctrica mediante IEC 61850, ICCP/TASE.2, CIM y OPC.
- **LEXA:** gestión de riesgos, cumplimiento, vulnerabilidades y trazabilidad ejecutiva.

En conjunto, estos partners permiten que LYNX ofrezca una solución completa: desde el activo y la protección en terreno hasta el centro de control, la capa de datos, la seguridad y el cumplimiento.

## Alcance y criterio de investigación

La página de LYNX publica siete partners en `src/content/site.ts`: SEL, Survalent, Systems With Intelligence, N3uron, LEXA, Cisco y SISCO.

Las presentaciones de TIIM y de la consultoría para Fahneu se utilizaron para comprender y enriquecer el modelo de servicios de LYNX —consultoría, arquitectura, datos, transformación digital, ejecución y staffing—, pero **no prueban por sí solas que TIIM o QUIU sean partners públicos de LYNX**. Conviene confirmarlo internamente antes de incorporarlos al sitio.

Tampoco se encontró en la documentación entregada el nivel contractual o de certificación de cada alianza —por ejemplo, reseller autorizado, integrador certificado o partner comercial—. El texto siguiente describe el encaje tecnológico y comercial, sin asumir categorías no demostradas.

## Mapa del aporte de cada partner

| Partner | Capa principal | Qué aporta directamente a LYNX | Oferta que ayuda a construir |
|---|---|---|---|
| SEL | Protección y automatización eléctrica | Relés, controladores, RTAC, comunicaciones OT y concentración de datos fasoriales | Protecciones, control de bahía, automatización de subestaciones, WAMS/PDC y modernización eléctrica |
| Survalent | Centro de control | Plataforma integrada SCADA, OMS y DMS con información operacional en tiempo real | Centros de control, supervisión remota, alarmas, operación de red y evolución hacia ADMS |
| SWI | Monitoreo de condición | Sensores y cámaras térmicas/visuales para detección temprana de fallas | Monitoreo remoto de subestaciones, mantenimiento basado en condición y reducción de inspecciones riesgosas |
| N3uron | Datos industriales y Edge | Conectividad multiprotocolo, normalización, historización, visualización y enlace OT/IT | IIoT, integración multisede, dashboards, gateways, Historian y procesamiento en el borde |
| Cisco | Red y ciberseguridad OT | Switching industrial robusto, segmentación, visibilidad de activos y acceso remoto seguro | Redes industriales, integración OT/IT, comunicaciones multisede y defensa en profundidad |
| SISCO | Interoperabilidad eléctrica | Software y conocimiento especializado en IEC 61850, ICCP/TASE.2, CIM y OPC | Integración de IED, SCADA, EMS, centros de control y sistemas de distintos fabricantes |
| LEXA | Riesgo y cumplimiento | Plataforma GRC/RiskOps para vincular procesos, activos, amenazas, controles y evidencias | Gestión de riesgos, cumplimiento, auditoría, vulnerabilidades y servicios gestionados de ciberseguridad |

## Aporte detallado por partner

### SEL — protección, automatización y control eléctrico

**Qué hace.** Schweitzer Engineering Laboratories desarrolla tecnología para sistemas eléctricos: relés de protección de líneas, transformadores, barras, generadores, alimentadores y motores; controladores de automatización; equipos RTAC; redes y comunicaciones OT; y software de concentración de datos. SEL también ofrece el software SEL-5073 para concentración, archivo y disponibilidad redundante de datos fasoriales.

**Qué aporta a LYNX.**

- Fortalece el núcleo histórico de LYNX en protecciones, control de energía, subestaciones y commissioning.
- Permite diseñar soluciones con componentes de protección y automatización de grado eléctrico, en lugar de integrar únicamente PLC o hardware genérico.
- Aporta una base tecnológica para control de bahía, gateways/RTU, concentración de datos y modernización de instalaciones existentes.
- Tiene encaje directo con los servicios publicados por LYNX: protecciones, sistemas WAMS/PMU, subestaciones, SCADA/RTU y telecomunicaciones.
- Refuerza la propuesta para proyectos como modernización de protecciones, automatización de alta y media tensión y monitoreo dinámico de red.

**Resultado conjunto.** SEL entrega tecnología especializada; LYNX releva, diseña, configura, integra, prueba y pone en servicio la solución en el contexto real del cliente.

Fuentes: [relés de protección SEL](https://selinc.com/products/categories/protective-relays/), [automatización y computación](https://selinc.com/products/categories/automation-computing/), [redes y comunicaciones](https://selinc.com/products/categories/networking-communications/) y [SEL-5073 PDC](https://selinc.com/products/5073/).

### Survalent — SCADA y gestión avanzada de redes

**Qué hace.** Survalent desarrolla SurvalentONE, una plataforma para utilities que integra SCADA, OMS —gestión de interrupciones— y DMS —gestión de distribución—. La plataforma centraliza el modelo de red, las alarmas, la telemetría, el control y la información operativa en tiempo real.

**Qué aporta a LYNX.**

- Proporciona la plataforma de software para centros de control y supervisión remota.
- Permite que LYNX evolucione desde proyectos de adquisición de señales hacia soluciones de operación integral de red.
- Reduce la fragmentación entre SCADA, gestión de interrupciones y aplicaciones de distribución.
- Ofrece escalabilidad: un cliente puede comenzar con SCADA y sumar capacidades ADMS a medida que crece.
- Complementa la experiencia de LYNX en RTU, telecomunicaciones, integración de protocolos, FAT/SAT y puesta en servicio.

**Resultado conjunto.** Survalent aporta el sistema operacional central; LYNX integra los equipos de campo, comunicaciones, señales, bases de datos, pantallas, pruebas y soporte local.

Fuentes: [SurvalentONE ADMS](https://www.survalent.com/products/survalentone-adms/) y [SurvalentONE SCADA](https://www.survalent.com/products/scada/).

### Systems With Intelligence — monitoreo térmico y visual

**Qué hace.** SWI ofrece monitoreo térmico y visual continuo para infraestructura crítica. Sus soluciones detectan anomalías de temperatura y permiten verificar remotamente el estado de transformadores, interruptores, barras, bushings, conexiones y otros activos. La empresa indica integración con SCADA, APM y sistemas de gestión de activos mediante protocolos industriales.

**Qué aporta a LYNX.**

- Extiende el servicio de LYNX más allá de la puesta en marcha hacia la supervisión continua del activo.
- Permite detectar señales tempranas de falla antes de que se conviertan en indisponibilidad o daño mayor.
- Habilita mantenimiento basado en condición, priorizando intervenciones con datos reales.
- Reduce inspecciones presenciales en subestaciones remotas o ambientes peligrosos.
- Agrega una capa visual y térmica a la telemetría eléctrica tradicional de SCADA.

**Resultado conjunto.** SWI aporta sensores, cámaras y plataforma de monitoreo; LYNX diseña la aplicación, instala, integra alarmas con SCADA/APM, realiza commissioning y mantiene la solución.

Fuentes: [soluciones SWI para utilities eléctricas](https://systemswithintelligence.com/industries-served/electric-utilities/) y [monitoreo térmico y visual](https://systemswithintelligence.com/products/thermal-and-visual-monitoring-systems/).

### N3uron — integración OT/IT, IIoT y DataOps industrial

**Qué hace.** N3uron es una plataforma modular de IIoT y DataOps industrial. Conecta PLC, RTU, SCADA, Historian, bases de datos y aplicaciones mediante módulos para protocolos y servicios como DNP3, IEC 60870-5-104, Modbus, OPC, MQTT, Sparkplug, REST y SQL. Puede procesar y contextualizar datos en el Edge, historizarlos, visualizarlos y enviarlos de forma segura hacia sistemas IT o nube.

**Qué aporta a LYNX.**

- Resuelve la capa de conectividad y normalización entre equipos de campo y plataformas corporativas.
- Acelera proyectos de integración OT/IT sin desarrollar cada gateway o conector desde cero.
- Habilita arquitecturas multisede, procesamiento local, historización y visualización web.
- Da soporte técnico a la vertical Tecnología de LYNX: operaciones conectadas, tableros de gestión, automatización, IoT industrial y APIs.
- Complementa un SCADA existente: puede capturar, contextualizar y distribuir datos sin obligar a reemplazar toda la plataforma operacional.
- Aporta controles para segmentación OT/DMZ/IT, cifrado TLS, 2FA, RBAC, auditoría y transferencia unidireccional mediante Data Diode.

**Resultado conjunto.** N3uron aporta la plataforma de datos industriales; LYNX define la arquitectura, modela las fuentes, implementa protocolos, construye visualizaciones e integra la información con los procesos del cliente.

Fuentes: [N3uron Edge](https://n3uron.com/solutions-edge/), [módulos de la plataforma](https://n3uron.com/iiot-platform-modules/) y [seguridad de N3uron](https://n3uron.com/iiot-platform-security/).

### Cisco — infraestructura de red y ciberseguridad OT

**Qué hace.** Cisco ofrece switching y routing industrial, conectividad para activos IIoT y seguridad integrada en la red. Cisco Cyber Vision aporta inventario dinámico de activos, visibilidad de comunicaciones y protocolos OT, detección de amenazas y soporte para segmentación. La oferta actual también integra políticas y acceso remoto seguro en equipamiento industrial seleccionado.

**Qué aporta a LYNX.**

- Proporciona la infraestructura sobre la que viajan las comunicaciones entre IED, PLC, RTU, cámaras, servidores y centros de control.
- Permite diseñar redes robustas para temperatura, vibración, polvo y ubicaciones remotas, donde el equipamiento empresarial convencional no es suficiente.
- Refuerza la ciberseguridad OT con inventario, visibilidad, segmentación y control de acceso remoto.
- Facilita proyectos multisede y la integración segura entre redes OT e IT.
- Complementa a N3uron: Cisco asegura y transporta la comunicación; N3uron contextualiza y distribuye los datos industriales.
- Complementa a LEXA: Cisco genera visibilidad y controles técnicos; LEXA puede gestionar el riesgo, la evidencia y el seguimiento de cumplimiento.

**Resultado conjunto.** Cisco aporta la infraestructura y controles de red; LYNX diseña la topología, instala, configura, segmenta, documenta, prueba y opera el entorno del cliente.

Fuentes: [Cisco Cyber Vision: capacidades OT](https://blogs.cisco.com/industrial-iot/cisco-cyber-vision-under-the-hood), [visibilidad y segmentación OT](https://blogs.cisco.com/industrial-iot/how-visibility-driven-segmentation-is-redefining-the-ot-security-starting-line/) y [características de switches Ethernet industriales](https://blogs.cisco.com/industrial-iot/why-industrial-ethernet-switches-putting-the-purpose-in-purpose-built).

### SISCO — interoperabilidad para sistemas eléctricos

**Qué hace.** SISCO —Systems Integration Specialists Company— se especializa en comunicaciones en tiempo real e integración para utilities. Sus productos y servicios cubren IEC 61850, ICCP/TASE.2, CIM, OPC, GOOSE, COMTRADE y otros mecanismos de intercambio de información entre IED, SCADA, EMS, centros de control y aplicaciones empresariales.

**Qué aporta a LYNX.**

- Reduce el riesgo técnico de integrar equipos y plataformas de distintos fabricantes.
- Aporta herramientas específicas para conectar dispositivos IEC 61850 con aplicaciones OPC.
- Facilita intercambio de datos en tiempo real mediante ICCP/TASE.2 entre centros de control, plantas, SCADA y EMS.
- Complementa a SEL y Survalent: SEL aporta protección/control, Survalent la operación SCADA/ADMS y SISCO la interoperabilidad entre componentes.
- Ayuda a resolver modernizaciones donde conviven activos legacy con estándares y plataformas actuales.
- Suma conocimiento, capacitación y servicios especializados en estándares eléctricos.

**Resultado conjunto.** SISCO aporta software y especialización en estándares; LYNX define el caso de uso, configura los extremos, realiza el mapeo de señales, prueba la interoperabilidad y mantiene la integración.

Fuentes: [SISCO: perfil y especialización](https://sisconet.com/index.php/about-us), [integración IEC 61850/OPC](https://sisconet.com/index.php/products/ax-s4-61850), [ICCP/TASE.2](https://sisconet.com/index.php/products/ax-s4-iccp) y [servicios de integración](https://sisconet.com/index.php/services).

### LEXA — riesgos, cumplimiento y ciberseguridad gestionada

**Qué hace.** LEXA se presenta como una plataforma GRC/RiskOps que conecta procesos, activos, amenazas, controles y evidencias con trazabilidad continua. La propuesta técnica entregada a LYNX amplía ese alcance con inventario de activos, inteligencia de vulnerabilidades, riesgo operacional, cumplimiento, correlación de eventos, reportería ejecutiva, capacitación y soporte especializado.

**Qué aporta a LYNX.**

- Agrega una capa de riesgo y cumplimiento a una oferta que hoy está fuertemente orientada a ingeniería e integración técnica.
- Permite convertir hallazgos técnicos —activos, vulnerabilidades, incidentes y controles— en planes de acción, responsables, evidencias y reportes ejecutivos.
- Habilita servicios recurrentes: acompañamiento de cumplimiento, gestión de vulnerabilidades, revisiones periódicas y soporte.
- Abre conversaciones con gerencia, riesgo, auditoría, seguridad y directorio, no solo con operación e ingeniería.
- Complementa la ciberseguridad OT de Cisco y N3uron con gobierno, seguimiento y trazabilidad.
- Puede ayudar a LYNX a ofrecer una solución integral para organizaciones reguladas o intensivas en infraestructura crítica.

**Resultado conjunto.** LEXA aporta la plataforma y soporte especializado; LYNX puede realizar el diagnóstico, despliegue, integración con fuentes del cliente, capacitación, operación local y acompañamiento continuo. La distribución exacta entre soporte L1/L2 de LYNX y L3 de LEXA debe validarse contractualmente.

Fuentes: [LEXA GRC](https://www.lexa.global/lexa-grc) y presentación interna `PROPUESTA-TECNICA-Y-COMERCIAL.pptx`, diapositivas 2 a 8.

> Nota legal: la plataforma puede facilitar la gestión de controles y evidencias, pero no debe prometerse que una herramienta por sí sola “garantiza” cumplimiento. La aplicabilidad normativa debe validarse para cada cliente.

## Cómo ayudan los partners a LYNX como empresa

### 1. Amplían el alcance sin obligar a desarrollar todo desde cero

LYNX puede concentrarse en el diagnóstico, la ingeniería y la ejecución, utilizando productos especializados en cada capa. Esto reduce tiempo de implementación y riesgo de desarrollo propio.

### 2. Transforman proyectos puntuales en soluciones de punta a punta

La combinación de partners permite pasar de vender un tablero, un SCADA o una red aislada a resolver un problema operacional completo: proteger, conectar, monitorear, operar, asegurar y auditar.

### 3. Mejoran la credibilidad técnica y comercial

El respaldo de fabricantes especializados fortalece propuestas ante clientes que exigen tecnología probada, soporte, roadmap de producto y compatibilidad con estándares internacionales.

### 4. Generan servicios recurrentes

Survalent, SWI, N3uron, Cisco y LEXA permiten extender la relación después del commissioning mediante monitoreo, soporte, mantenimiento, actualizaciones, gestión de incidentes y cumplimiento continuo.

### 5. Abren nuevas puertas dentro del mismo cliente

SEL y Survalent conectan con ingeniería y operación; Cisco y N3uron con OT/IT; LEXA con ciberseguridad, riesgo y auditoría; SWI con mantenimiento y gestión de activos; SISCO con arquitectura e interoperabilidad. Esto amplía el número de áreas con las que LYNX puede trabajar.

## Soluciones conjuntas que LYNX puede empaquetar

Estas combinaciones son hipótesis comerciales y de arquitectura. Deben validarse compatibilidad, licenciamiento y soporte antes de ofrecerlas como paquetes cerrados.

### Subestación digital y centro de control

- SEL: protección, control y automatización.
- SISCO: integración IEC 61850/OPC e interoperabilidad.
- Cisco: red industrial y segmentación.
- Survalent: SCADA/ADMS y operación centralizada.
- LYNX: ingeniería, integración, FAT/SAT, commissioning y soporte.

### Monitoreo inteligente y mantenimiento basado en condición

- SWI: monitoreo térmico y visual.
- N3uron: adquisición, normalización e historización de datos.
- Cisco: conectividad segura.
- Survalent o sistema existente: alarmas y visualización operacional.
- LYNX: instalación, integración y operación del servicio.

### Ciberseguridad OT y cumplimiento continuo

- Cisco: visibilidad, segmentación y acceso remoto seguro.
- N3uron: intercambio seguro entre OT, DMZ e IT.
- LEXA: riesgos, controles, evidencias, vulnerabilidades y reportería.
- LYNX: diagnóstico, hardening, implementación y servicio gestionado.

### Integración industrial multisede

- Cisco: infraestructura de comunicaciones.
- N3uron: Edge, conectores, datos y visualización.
- SISCO: protocolos específicos de utilities cuando correspondan.
- LYNX: arquitectura To-Be, roadmap, despliegue en terreno, adopción y soporte.

## Texto propuesto para el apartado de la web

### Tecnología global. Ingeniería y ejecución local.

Nuestros partners amplían la capacidad de LYNX para resolver operaciones críticas de punta a punta. Combinamos tecnologías especializadas en protección eléctrica, SCADA, monitoreo, datos industriales, redes, interoperabilidad y cumplimiento con nuestra experiencia en ingeniería, integración, commissioning y soporte en terreno.

No entregamos productos aislados: diseñamos cada solución para que equipos, sistemas y datos funcionen como una sola operación, con seguridad, trazabilidad y capacidad de evolución.

**Aporte resumido por partner:**

- **SEL:** protección, automatización y control para sistemas eléctricos críticos.
- **Survalent:** SCADA y gestión avanzada para operar redes con información en tiempo real.
- **Systems With Intelligence:** monitoreo térmico y visual para anticipar fallas y proteger activos.
- **N3uron:** integración OT/IT, IIoT y datos industriales desde el Edge hasta la empresa.
- **Cisco:** conectividad robusta y ciberseguridad para redes industriales.
- **SISCO:** interoperabilidad entre dispositivos, SCADA y centros de control mediante estándares eléctricos.
- **LEXA:** riesgo, cumplimiento y trazabilidad para convertir información técnica en decisiones y planes de acción.

## Ajustes recomendados en la página actual

1. Cambiar el nombre visual **“Sisco”** por **“SISCO”** y describir su especialización real en interoperabilidad IEC 61850, ICCP/TASE.2, CIM y OPC.
2. Reemplazar el enlace `#` de LEXA por el [sitio oficial de LEXA](https://www.lexa.global/).
3. Cambiar la descripción genérica de LEXA por una referencia concreta a GRC/RiskOps, riesgos, cumplimiento y vulnerabilidades.
4. Ampliar la descripción de Cisco para incluir redes industriales y ciberseguridad OT, no solo networking empresarial.
5. Explicar en una frase el rol de LYNX frente a todos los partners: **“LYNX diseña, integra, implementa y soporta estas tecnologías en la operación del cliente.”**
6. No publicar niveles de certificación, exclusividad, distribución o soporte hasta confirmarlos con documentación contractual.

## Validaciones internas pendientes

Antes de convertir este borrador en contenido público conviene confirmar:

- Qué tipo de relación contractual existe con cada empresa.
- En qué países y verticales está habilitada LYNX para comercializar o implementar cada solución.
- Qué certificaciones técnicas y comerciales tiene actualmente el equipo.
- Qué niveles de soporte presta LYNX y cuáles quedan a cargo del fabricante.
- Qué proyectos o casos de éxito pueden mencionarse con autorización.
- Si TIIM y/o QUIU deben incorporarse formalmente como partners o solo como antecedentes del modelo de consultoría.
- Si el alcance LEXA de la propuesta —incluidos módulos, integraciones y SLA— continúa vigente.

## Documentación interna revisada

- `src/content/site.ts`: propuesta de valor general y listado público de partners.
- `src/content/energia.ts`: WAMS/PMU, subestaciones, SCADA, protecciones, telecomunicaciones y ciberseguridad OT.
- `src/content/tecnologia.ts`: integración OT/IT, automatización, datos, despliegue y soporte.
- `src/content/recursos.ts`: casos Villa Hipódromo, ESA y Nihuil 2.
- `Presentacion_Lynx Team..pptx`: identidad, trayectoria, servicios y evolución de LYNX.
- `TIIM propuesta terminada (1).pptx`: transformación digital, arquitectura, datos, ejecución y staffing.
- `PROPUESTA-TECNICA-Y-COMERCIAL.pptx`: alcance funcional y comercial propuesto para LEXA.
- `Propuesta Tecnica Fanheu Consultoria Abril2024.pptx`: diagnóstico As-Is, arquitectura, procesos, datos y roadmap de implementación.
