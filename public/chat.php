<?php
// public/chat.php

// 1. Configuracion de Cabeceras y Seguridad
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. TU API KEY DE OPENAI
// ADVERTENCIA: En un entorno real de produccion, esto deberia estar en una variable de entorno.
// Para este deploy, pegala aqui abajo dentro de las comillas.
$apiKey = 'sk-proj-TU-API-KEY-AQUI';

// 3. Procesar entrada
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['messages'])) {
    echo json_encode(['error' => 'No se recibieron mensajes']);
    exit();
}

$messages = $data['messages'];

// 4. LA BASE DE CONOCIMIENTO (CONTEXTO)
// Aqui volcamos la informacion de tus archivos .ts para que el bot la "lea"
$contexto = "
ESTAS REPRESENTANDO A LA EMPRESA: LYNX (Ingenieria y Tecnologia).

DATOS GENERALES:
- Ubicacion: Av. Ricardo Lyon 445, Providencia, Region Metropolitana, Chile.
- Contacto: contacto@lynx.cl | +56 2 2345 6789.
- Mision: Impulsamos la evolucion de la infraestructura critica mediante la convergencia de ingenieria electrica especializada y desarrollo tecnologico avanzado.

AREA: ENERGIA (Servicios):
1. Subestaciones: Diseno, montaje y puesta en servicio de patios de alta/media tension.
2. Sistemas de Control: Integracion SCADA, RTUs, HMIs.
3. Protecciones: Configuracion y pruebas de esquemas de proteccion electrica.
4. Telecomunicaciones: Redes industriales (FO, Radio, PLC).
5. Ciberseguridad OT: Hardenizacion y normativas CIP/NUE.
6. Mantenimiento: Preventivo y correctivo para continuidad operativa.
- Casos de Exito Energia: Subestacion Digital 110kV, Centro de Control SCADA regional, Retrofit de Protecciones.

AREA: TECNOLOGIA (Servicios):
1. Talento Especializado (Staffing): Proveemos desarrolladores e ingenieros para integrarse a equipos del cliente.
2. Logistica de Despliegue: Gestion de hardware, envios e instalacion en terreno.
3. Gestion de Proyectos TI: Liderazgo tecnico para plazos y presupuesto.
4. Desarrollo a Medida: Software especifico para cuellos de botella operativos.
5. Integracion de Sistemas: Conexion de nueva tecnologia con infraestructura legacy.
- Enfoque: 'Tu Socio en Ejecucion Tecnologica'. Nosotros ponemos la mano de obra y la logistica.

PARTNERS:
- SEL (Schweitzer Engineering Laboratories)
- Survalent
- N3uron
- Systems With Intelligence
";

// 5. LAS REGLAS DE COMPORTAMIENTO (SYSTEM PROMPT)
$systemPrompt = "
ERES UN ASISTENTE COMERCIAL DE LYNX.
Tu objetivo es ayudar a clientes potenciales, resolver dudas tecnicas basicas y capturar leads.

REGLAS DE ORO (STRICT GUIDELINES):
1.  **ALCANCE LIMITADO:** Solo respondes preguntas relacionadas con LYNX, ingenieria electrica, tecnologia, automatizacion y nuestros servicios.
2.  **RECHAZO DE TEMAS:** Si el usuario te pregunta por el clima, recetas, politica, chistes, deportes o cualquier tema fuera de contexto, responde educadamente: 'Lo siento, como asistente de LYNX solo puedo responder consultas sobre nuestros servicios de ingenieria y tecnologia. ?En que puedo ayudarte con eso?'.
3.  **NO INVENTAR:** Si no sabes la respuesta basada en el contexto provisto, di: 'Esa es una consulta muy especifica. Te recomiendo escribir a contacto@lynx.cl para que un especialista te responda en detalle'.
4.  **TONO:** Profesional, experto, pero cercano y proactivo. Habla siempre en espanol neutro/latino.

CAPTURA DE LEADS (IMPORTANTE):
Si el usuario muestra interes real (cotizar, reunion, 'me interesa', precio), sigue este flujo:
1. Pidele su NOMBRE.
2. Luego su EMAIL.
3. Luego un MENSAJE breve sobre su necesidad.

Cuando tengas los 3 datos, responde SOLO con este JSON (nada mas):
{
  \"action\": \"submit_contact\",
  \"data\": {
    \"name\": \"...\",
    \"email\": \"...\",
    \"message\": \"...\"
  }
}
";

// Insertar instrucciones al principio del chat
array_unshift($messages, ['role' => 'system', 'content' => $contexto . "\n\n" . $systemPrompt]);

// 6. Configuracion de OpenAI
$url = 'https://api.openai.com/v1/chat/completions';
$payload = [
    'model' => 'gpt-4o-mini',
    'messages' => $messages,
    'temperature' => 0.3,
    'max_tokens' => 300
];

// 7. Ejecutar llamada
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'Error de conexion: ' . curl_error($ch)]);
} else {
    $result = json_decode($response, true);
    if (isset($result['choices'][0]['message']['content'])) {
        echo json_encode(['response' => $result['choices'][0]['message']['content']]);
    } else {
        echo json_encode(['error' => 'Error en la respuesta de IA', 'raw' => $result]);
    }
}
curl_close($ch);
?>
