<?php

declare(strict_types=1);

function lynx_config(): array
{
    $configPath = __DIR__ . '/config.php';
    if (!file_exists($configPath)) {
        lynx_json_response([
            'success' => false,
            'message' => 'Missing API config. Copy public/api/config.example.php to public/api/config.php.',
        ], 500);
    }

    $config = require $configPath;
    if (!is_array($config)) {
        lynx_json_response(['success' => false, 'message' => 'Invalid API config.'], 500);
    }

    return $config;
}

function lynx_db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config = lynx_config();
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db_host'], $config['db_name']);

    $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    return $pdo;
}

function lynx_json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function lynx_decode_json_field(?string $value): array
{
    if (!$value) {
        return [];
    }

    $decoded = json_decode($value, true);
    return is_array($decoded) ? $decoded : [];
}

function lynx_default_case_design(): array
{
    return [
        'card' => 'compact',
        'accent' => 'orange',
        'image' => 'cover',
        'detail' => 'cards',
    ];
}

function lynx_sanitize_case_design(array $design): array
{
    $defaults = lynx_default_case_design();
    $allowed = [
        'card' => ['compact', 'visual', 'technical'],
        'accent' => ['orange', 'violet', 'blue', 'green'],
        'image' => ['cover', 'contain'],
        'detail' => ['cards', 'list'],
    ];

    foreach ($allowed as $key => $values) {
        if (!isset($design[$key]) || !in_array($design[$key], $values, true)) {
            $design[$key] = $defaults[$key];
        }
    }

    return [
        'card' => $design['card'],
        'accent' => $design['accent'],
        'image' => $design['image'],
        'detail' => $design['detail'],
    ];
}

function lynx_case_design_from_row(array $row): array
{
    return lynx_sanitize_case_design(lynx_decode_json_field($row['design'] ?? null));
}

function lynx_ensure_success_cases_design_column(): void
{
    static $checked = false;
    if ($checked) {
        return;
    }
    $checked = true;

    try {
        $stmt = lynx_db()->query("SHOW COLUMNS FROM success_cases LIKE 'design'");
        if (!$stmt->fetch()) {
            lynx_db()->exec("ALTER TABLE success_cases ADD design LONGTEXT NULL AFTER details");
        }
    } catch (Throwable $error) {
        // Keep older installs readable; write paths will surface a concrete DB error if ALTER is unavailable.
    }
}

function lynx_ensure_success_cases_featured_column(): void
{
    static $checked = false;
    if ($checked) {
        return;
    }
    $checked = true;

    try {
        $stmt = lynx_db()->query("SHOW COLUMNS FROM success_cases LIKE 'featured'");
        if (!$stmt->fetch()) {
            lynx_db()->exec("ALTER TABLE success_cases ADD featured TINYINT(1) NOT NULL DEFAULT 0 AFTER design");
            lynx_db()->exec("ALTER TABLE success_cases ADD INDEX idx_success_cases_featured_category (featured, category, status, updated_at)");
        }
    } catch (Throwable $error) {
        // Older installs remain readable; write paths will report a concrete migration error.
    }
}

function lynx_case_from_row(array $row): array
{
    return [
        'id' => $row['slug'],
        'slug' => $row['slug'],
        'category' => $row['category'],
        'title' => $row['title'],
        'subtitle' => $row['subtitle'],
        'summary' => $row['summary'],
        'description' => $row['description'],
        'image' => $row['image'],
        'tags' => lynx_decode_json_field($row['tags']),
        'details' => lynx_decode_json_field($row['details']),
        'gallery' => lynx_decode_json_field($row['gallery']),
        'design' => lynx_case_design_from_row($row),
        'featured' => (bool)($row['featured'] ?? false),
        'status' => $row['status'],
        'updated_at' => $row['updated_at'],
    ];
}
