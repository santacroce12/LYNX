<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$slug = trim((string)($_GET['slug'] ?? $_GET['id'] ?? ''));
if ($slug === '') {
    lynx_json_response(['success' => false, 'message' => 'Falta el identificador del caso.'], 400);
}

try {
    lynx_ensure_success_cases_design_column();
    lynx_ensure_success_cases_featured_column();
    $stmt = lynx_db()->prepare(
        "SELECT slug, category, title, subtitle, summary, description, image, tags, details, gallery, design, featured, status, updated_at
         FROM success_cases
         WHERE slug = :slug AND status = 'published'
         LIMIT 1"
    );
    $stmt->execute(['slug' => $slug]);
    $row = $stmt->fetch();

    if (!$row) {
        lynx_json_response(['success' => false, 'message' => 'No se encontró el caso solicitado.'], 404);
    }

    lynx_json_response(['success' => true, 'case' => lynx_case_from_row($row)]);
} catch (Throwable $error) {
    lynx_json_response(['success' => false, 'message' => 'No se pudo cargar el caso de éxito.'], 500);
}
