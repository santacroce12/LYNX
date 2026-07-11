<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

try {
    lynx_ensure_success_cases_design_column();
    lynx_ensure_success_cases_featured_column();
    $stmt = lynx_db()->query(
        "SELECT slug, category, title, subtitle, summary, description, image, tags, details, gallery, design, featured, status, updated_at
         FROM success_cases
         WHERE status = 'published'
         ORDER BY updated_at DESC, id DESC"
    );

    $cases = array_map('lynx_case_from_row', $stmt->fetchAll());
    lynx_json_response(['success' => true, 'cases' => $cases]);
} catch (Throwable $error) {
    lynx_json_response(['success' => false, 'message' => 'No se pudieron cargar los casos de éxito.'], 500);
}
