<?php
// public/chat.php
// ==========================================
// ZONA DE CONFIGURACION DEL CLIENTE
// ==========================================

// 1. PEGA AQUI TU CLAVE DE OPENAI (Empieza con sk-...)
$apiKey = 'sk-proj-TU-API-KEY-AQUI';

// 2. ESCRIBE AQUI TU DOMINIO (Sin barra al final)
// Ejemplo: 'https://lynx-ingenieria.cl'
// Si estas probando en tu PC, usa 'http://localhost:3000'
$miDominio = 'www.lynx.cl'; // CAMBIAR POR TU DOMINIO REAL EN PRODUCCION PARA SEGURIDAD

// ==========================================
// FIN DE LA CONFIGURACION
// ==========================================

// 1. Configuracion de Seguridad y Cabeceras
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: $miDominio");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de solicitud preliminar (Preflight) del navegador
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Validacion basica de entrada
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['messages'])) {
    echo json_encode(['error' => 'No se recibieron mensajes validos.']);
    exit();
}

$messages = $data['messages'];

// 3. EL CEREBRO DE LYNX (Contexto y Reglas)
// Aqui definimos que sabe la IA y como debe comportarse.
$contexto = "
ESTAS REPRESENTANDO A LA EMPRESA: LYNX (Ingenieria y Tecnologia).

DATOS GENERALES:

Ubicacion: Av. Ricardo Lyon 445, Providencia, Region Metropolitana, Chile.

Contacto: contacto@lynx.cl | +56 2 2345 6789.

Mision: Impulsamos la evolucion de la infraestructura critica mediante ingenieria electrica y tecnologia.

AREA: ENERGIA (Servicios):

Subestaciones: Diseno y montaje de patios de alta/media tension.

Sistemas de Control: SCADA, RTUs, HMIs.

Protecciones: Esquemas de proteccion electrica.

Telecomunicaciones: Redes industriales (FO, Radio).

Ciberseguridad OT: Normativas CIP/NUE.

Mantenimiento: Preventivo y correctivo.

AREA: TECNOLOGIA (Servicios - Enfoque: Tu Socio en Ejecucion):

Talento Especializado: Proveemos ingenieros y desarrolladores (Staffing).

Logistica de Despliegue: Gestion de hardware e instalacion en terreno.

Gestion de Proyectos TI: Control de plazos y presupuesto.

Desarrollo a Medida: Software especifico operativo.

Integracion de Sistemas: Conexion con infraestructura legacy.
";

$systemPrompt = "
ERES UN ASISTENTE COMERCIAL EXPERTO DE LYNX. Tu objetivo es resolver dudas sobre nuestros servicios y capturar oportunidades de negocio.

REGLAS DE ORO (SEGURIDAD DE MARCA):

SOLO LYNX: NO respondas preguntas sobre el clima, deportes, chistes, politica, recetas o cultura general. Si te preguntan eso, di amablemente: 'Disculpa, solo estoy entrenado para asistir en temas de ingenieria y tecnologia relacionados con los servicios de LYNX.'.

NO INVENTAR: Si no tienes la informacion en el contexto, di: 'Esa es una consulta tecnica especifica. Por favor contactanos directamente para derivarte con un ingeniero especialista'.

TONO: Profesional, corporativo pero cercano. Espanol neutro.

CAPTURA DE LEADS (VENTAS): Si el usuario muestra interes en cotizar o contratar:

Pide su NOMBRE.

Pide su EMAIL corporativo.

Pide un breve MENSAJE sobre el proyecto.

Cuando tengas esos 3 datos, RESPONDE UNICAMENTE CON ESTE JSON: { "action": "submit_contact", "data": { "name": "...", "email": "...", "message": "..." } }
";

// Insertar las instrucciones al inicio de la conversacion
array_unshift($messages, ['role' => 'system', 'content' => $contexto . "\n\n" . $systemPrompt]);

// 4. Configurar llamada a OpenAI
$url = 'https://api.openai.com/v1/chat/completions';

$payload = [
    'model' => 'gpt-4o-mini',
    'messages' => $messages,
    'temperature' => 0.3,
    'max_tokens' => 400
];

// 5. Ejecutar cURL
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
    echo json_encode(['error' => 'Error de conexion interno.']);
} else {
    $result = json_decode($response, true);

    if (isset($result['choices'][0]['message']['content'])) {
        echo json_encode(['response' => $result['choices'][0]['message']['content']]);
    } else {
        error_log("OpenAI Error: " . $response);
        echo json_encode(['error' => 'El asistente no esta disponible en este momento.']);
    }
}

curl_close($ch);
?>
