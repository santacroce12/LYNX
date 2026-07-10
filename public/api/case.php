<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$slug = trim((string)($_GET['slug'] ?? $_GET['id'] ?? ''));
if ($slug === '') {
    lynx_json_response(['success' => false, 'message' => 'Missing slug.'], 400);
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
        lynx_json_response(['success' => false, 'message' => 'Case not found.'], 404);
    }

    lynx_json_response(['success' => true, 'case' => lynx_case_from_row($row)]);
} catch (Throwable $error) {
    lynx_json_response(['success' => false, 'message' => 'Could not load case.'], 500);
}
