<?php
// public/chat.php

// 1. Forzar codificaci?n UTF-8 en la respuesta
header('Content-Type: application/json; charset=utf-8');

// Configuraci?n de CORS (Permitir peticiones desde tu dominio)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Obtener la API Key de una variable de entorno o definirla aqu?
// IMPORTANTE: En producci?n, usa getenv('OPENAI_API_KEY')
$apiKey = 'sk-proj-TU-API-KEY-AQUI'; // <--- Reemplaza esto con tu Key real si no usas env vars

// 3. Leer el cuerpo de la solicitud (JSON)
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['messages'])) {
    echo json_encode(['error' => 'No messages provided']);
    exit();
}

$messages = $data['messages'];

// 4. Definir el Contexto y el System Prompt (TEXTOS CORREGIDOS)
$contexto = "
INFORMACI?N DE LYNX (Resumen):
- Empresa de ingenier?a especializada en transmisi?n de energ?a y automatizaci?n.
- Servicios: Subestaciones, Protecciones, SCADA, Telecomunicaciones, Ciberseguridad OT.
- Partners: SEL, Survalent, N3uron, Systems With Intelligence.
- Ubicaci?n: Av. Apoquindo 6410, Of. 605, Las Condes.
- Contacto: contacto@lynx.cl.
";

$systemPrompt = "
Eres el asistente virtual de LYNX.
- Tu tono es profesional, cercano y t?cnico cuando sea necesario.
- Usa la informaci?n de contexto provista para responder dudas sobre servicios, partners y ubicaci?n.
- Si no sabes la respuesta, sugiere contactar a un especialista humano.

REGLAS DE CAPTURA DE LEADS (IMPORTANTE):
Si el usuario expresa inter?s expl?cito en contactar, cotizar, agendar una reuni?n o contratar servicios:
1. P?dele amablemente su NOMBRE.
2. Una vez que te lo de, p?dele su EMAIL.
3. Finalmente, p?dele un MENSAJE o motivo breve.

CUANDO TENGAS LOS 3 DATOS (Nombre, Email, Mensaje):
NO respondas con texto normal. Responde ?NICAMENTE con este bloque JSON exacto (sin markdown, solo el JSON):
{
  "action": "submit_contact",
  "data": {
    "name": "(el nombre capturado)",
    "email": "(el email capturado)",
    "message": "(el motivo capturado)"
  }
}
";

// Insertar el System Prompt al inicio del historial
array_unshift($messages, ['role' => 'system', 'content' => $contexto . "
" . $systemPrompt]);

// 5. Configurar la llamada a OpenAI
$url = 'https://api.openai.com/v1/chat/completions';

$payload = [
    'model' => 'gpt-4o-mini', // Modelo r?pido y econ?mico
    'messages' => $messages,
    'temperature' => 0.7,
    'max_tokens' => 500
];

// 6. Ejecutar cURL
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
    echo json_encode(['error' => 'Error en cURL: ' . curl_error($ch)]);
    curl_close($ch);
    exit();
}

curl_close($ch);

// 7. Procesar respuesta
$result = json_decode($response, true);

if (isset($result['choices'][0]['message']['content'])) {
    $botReply = $result['choices'][0]['message']['content'];
    echo json_encode(['response' => $botReply]);
} else {
    // Si OpenAI devuelve un error, lo mostramos
    echo json_encode(['error' => 'Ocurri? un error con la IA', 'details' => $result]);
}
?>
