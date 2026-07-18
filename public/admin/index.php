<?php

declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');
if (function_exists('mb_internal_encoding')) {
    mb_internal_encoding('UTF-8');
}

session_start();
require __DIR__ . '/../api/bootstrap.php';
lynx_ensure_default_admin();

function h(?string $value): string
{
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

function redirect_admin(string $query = ''): void
{
    header('Location: /admin/' . $query);
    exit;
}

function current_user(): ?array
{
    return $_SESSION['lynx_admin_user'] ?? null;
}

function require_login(): void
{
    if (!current_user()) {
        redirect_admin('?login=1');
    }
}

function slugify(string $value): string
{
    $value = iconv('UTF-8', 'ASCII//TRANSLIT', $value) ?: $value;
    $value = strtolower($value);
    $value = preg_replace('/[^a-z0-9]+/', '-', $value) ?? '';
    $value = trim($value, '-');
    return $value !== '' ? $value : 'caso';
}

function json_textarea(array $items): string
{
    return json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function lines_to_json(string $value): string
{
    $items = lines_to_array($value);
    return json_encode($items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function lines_to_array(string $value): array
{
    $lines = preg_split('/\R/', $value) ?: [];
    return array_values(array_filter(array_map('trim', $lines), fn($line) => $line !== ''));
}

function json_array_from_text(string $value, array $fallback = []): array
{
    $decoded = json_decode($value, true);
    return is_array($decoded) ? $decoded : $fallback;
}

function details_to_lines(?string $value): string
{
    $details = lynx_decode_json_field($value);
    $items = [];

    foreach ($details as $detail) {
        if (!isset($detail['items']) || !is_array($detail['items'])) {
            continue;
        }

        foreach ($detail['items'] as $item) {
            $item = trim((string)$item);
            if ($item !== '') {
                $items[] = $item;
            }
        }
    }

    return implode("\n", $items);
}

function featured_count(string $category, int $excludeId = 0): int
{
    $sql = 'SELECT COUNT(*) FROM success_cases WHERE featured = 1 AND category = :category';
    $params = ['category' => $category];

    if ($excludeId > 0) {
        $sql .= ' AND id <> :id';
        $params['id'] = $excludeId;
    }

    $stmt = lynx_db()->prepare($sql);
    $stmt->execute($params);
    return (int)$stmt->fetchColumn();
}

function assert_featured_slot(string $category, int $excludeId = 0): void
{
    if (featured_count($category, $excludeId) >= 3) {
        throw new RuntimeException('Ya hay 3 casos seleccionados para ' . $category . '. Quitá uno antes de agregar otro.');
    }
}

function upload_file(string $field): ?string
{
    if (!isset($_FILES[$field]) || $_FILES[$field]['error'] === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    if ($_FILES[$field]['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('No se pudo subir el archivo.');
    }

    $allowed = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
    ];

    $tmp = $_FILES[$field]['tmp_name'];
    $mime = mime_content_type($tmp);
    if (!isset($allowed[$mime])) {
        throw new RuntimeException('Formato de imagen no permitido.');
    }

    $config = lynx_config();
    $dir = $config['upload_dir'];
    if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
        throw new RuntimeException('No se pudo crear la carpeta de uploads.');
    }

    $filename = date('YmdHis') . '-' . bin2hex(random_bytes(4)) . '.' . $allowed[$mime];
    $target = rtrim($dir, '/\\') . DIRECTORY_SEPARATOR . $filename;
    if (!move_uploaded_file($tmp, $target)) {
        throw new RuntimeException('No se pudo guardar la imagen.');
    }

    return rtrim($config['upload_url'], '/') . '/' . $filename;
}

function upload_gallery(): array
{
    if (!isset($_FILES['gallery_files'])) {
        return [];
    }

    $urls = [];
    $files = $_FILES['gallery_files'];
    foreach ($files['name'] as $index => $name) {
        if ($files['error'][$index] === UPLOAD_ERR_NO_FILE) {
            continue;
        }

        $_FILES['_gallery_one'] = [
            'name' => $name,
            'type' => $files['type'][$index],
            'tmp_name' => $files['tmp_name'][$index],
            'error' => $files['error'][$index],
            'size' => $files['size'][$index],
        ];
        $url = upload_file('_gallery_one');
        if ($url) {
            $urls[] = $url;
        }
    }
    unset($_FILES['_gallery_one']);

    return $urls;
}

$action = $_POST['action'] ?? $_GET['action'] ?? '';
$error = '';

try {
    lynx_ensure_success_cases_design_column();
    lynx_ensure_success_cases_featured_column();

    if ($action === 'login') {
        $email = trim((string)($_POST['email'] ?? ''));
        $password = (string)($_POST['password'] ?? '');
        $stmt = lynx_db()->prepare('SELECT id, email, password_hash, role FROM admin_users WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['lynx_admin_user'] = [
                'id' => $user['id'],
                'email' => $user['email'],
                'role' => $user['role'],
            ];
            redirect_admin();
        }
        $error = 'Usuario o contraseña inválidos.';
    }

    if ($action === 'logout') {
        $_SESSION = [];
        session_destroy();
        redirect_admin('?login=1');
    }

    if ($action === 'save') {
        require_login();

        $id = (int)($_POST['id'] ?? 0);
        $title = trim((string)($_POST['title'] ?? ''));
        $slug = slugify(trim((string)($_POST['slug'] ?? '')) ?: $title);
        $category = ($_POST['category'] ?? '') === 'Tecnología' ? 'Tecnología' : 'Energía';
        $status = ($_POST['status'] ?? '') === 'published' ? 'published' : 'draft';
        $featured = $status === 'published' && isset($_POST['featured']) ? 1 : 0;
        $image = trim((string)($_POST['existing_image'] ?? ''));
        $uploadedImage = upload_file('image_file');
        if ($uploadedImage) {
            $image = $uploadedImage;
        }

        if ($title === '' || $image === '') {
            throw new RuntimeException('El título y la imagen principal son obligatorios.');
        }

        $detailItems = lines_to_array((string)($_POST['detail_items'] ?? ''));
        $existingGallery = json_array_from_text((string)($_POST['existing_gallery'] ?? '[]'));
        $existingGallery = array_values(array_filter(array_map('trim', $existingGallery)));
        $gallery = $image !== '' ? [$image] : [];
        $gallery = array_values(array_unique(array_merge($gallery, $existingGallery, upload_gallery())));
        $details = count($detailItems) > 0
            ? [['title' => 'Puntos destacados', 'items' => $detailItems]]
            : [];
        $design = lynx_sanitize_case_design([
            'card' => (string)($_POST['design_card'] ?? ''),
            'accent' => (string)($_POST['design_accent'] ?? ''),
            'image' => (string)($_POST['design_image'] ?? ''),
            'detail' => (string)($_POST['design_detail'] ?? ''),
        ]);

        if ($featured === 1) {
            assert_featured_slot($category, $id);
        }

        $payload = [
            'slug' => $slug,
            'title' => $title,
            'subtitle' => trim((string)($_POST['subtitle'] ?? '')),
            'summary' => trim((string)($_POST['summary'] ?? '')),
            'description' => trim((string)($_POST['description'] ?? '')),
            'category' => $category,
            'tags' => lines_to_json((string)($_POST['tags'] ?? '')),
            'image' => $image,
            'gallery' => json_encode($gallery, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'details' => json_encode($details, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'design' => json_encode($design, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'featured' => $featured,
            'status' => $status,
        ];

        if ($id > 0) {
            $payload['id'] = $id;
            $sql = 'UPDATE success_cases
                    SET slug = :slug, title = :title, subtitle = :subtitle, summary = :summary,
                        description = :description, category = :category, tags = :tags, image = :image,
                        gallery = :gallery, details = :details, design = :design, featured = :featured, status = :status
                    WHERE id = :id';
            lynx_db()->prepare($sql)->execute($payload);
        } else {
            $sql = 'INSERT INTO success_cases
                    (slug, title, subtitle, summary, description, category, tags, image, gallery, details, design, featured, status)
                    VALUES (:slug, :title, :subtitle, :summary, :description, :category, :tags, :image, :gallery, :details, :design, :featured, :status)';
            lynx_db()->prepare($sql)->execute($payload);
        }

        redirect_admin('?saved=1');
    }

    if ($action === 'delete') {
        require_login();
        $id = (int)($_POST['id'] ?? 0);
        if ($id > 0) {
            lynx_db()->prepare('DELETE FROM success_cases WHERE id = :id')->execute(['id' => $id]);
        }
        $return = ($_POST['return_view'] ?? '') === 'resources' ? '?view=resources&deleted=1' : '?deleted=1';
        redirect_admin($return);
    }

    if ($action === 'toggle_status') {
        require_login();
        $id = (int)($_POST['id'] ?? 0);
        $status = ($_POST['status'] ?? '') === 'published' ? 'published' : 'draft';
        if ($id > 0) {
            if ($status === 'draft') {
                lynx_db()->prepare('UPDATE success_cases SET status = :status, featured = 0 WHERE id = :id')->execute([
                    'id' => $id,
                    'status' => $status,
                ]);
            } else {
                lynx_db()->prepare('UPDATE success_cases SET status = :status WHERE id = :id')->execute([
                    'id' => $id,
                    'status' => $status,
                ]);
            }
        }
        redirect_admin('?view=resources&updated=1');
    }

    if ($action === 'toggle_featured') {
        require_login();
        $id = (int)($_POST['id'] ?? 0);
        $featured = ($_POST['featured'] ?? '') === '1' ? 1 : 0;

        if ($id > 0) {
            $stmt = lynx_db()->prepare('SELECT category, status FROM success_cases WHERE id = :id LIMIT 1');
            $stmt->execute(['id' => $id]);
            $case = $stmt->fetch();

            if ($case) {
                if ($featured === 1) {
                    if ($case['status'] !== 'published') {
                        throw new RuntimeException('Publicá el caso antes de mostrarlo en la página de su categoría.');
                    }
                    assert_featured_slot((string)$case['category'], $id);
                }
                lynx_db()->prepare('UPDATE success_cases SET featured = :featured WHERE id = :id')->execute([
                    'id' => $id,
                    'featured' => $featured,
                ]);
            }
        }

        redirect_admin('?view=resources&featured_updated=1');
    }
} catch (Throwable $exception) {
    $error = $exception->getMessage();
}

$isLogin = isset($_GET['login']) && !current_user();
$view = (string)($_GET['view'] ?? 'form');
if ($error !== '' && $action === 'toggle_featured') {
    $view = 'resources';
}
$editId = (int)($_GET['edit'] ?? 0);
$editing = null;
$cases = [];
$featuredCounts = ['Energía' => 0, 'Tecnología' => 0];

if (!$isLogin && !current_user()) {
    redirect_admin('?login=1');
}

if (!$isLogin && current_user()) {
    if ($editId > 0) {
        $stmt = lynx_db()->prepare('SELECT * FROM success_cases WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $editId]);
        $editing = $stmt->fetch() ?: null;
    }
    $cases = lynx_db()->query('SELECT id, slug, title, subtitle, summary, description, category, tags, details, design, image, featured, status, updated_at FROM success_cases ORDER BY updated_at DESC, id DESC')->fetchAll();
    foreach ($cases as $case) {
        if ((int)($case['featured'] ?? 0) === 1 && isset($featuredCounts[$case['category']])) {
            $featuredCounts[$case['category']]++;
        }
    }
}

$config = file_exists(__DIR__ . '/../api/config.php') ? lynx_config() : ['base_url' => 'https://www.lynx.cl'];
$baseUrl = rtrim($config['base_url'], '/');
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin Recursos | Lynx</title>
  <style>
    :root { color-scheme: dark; --bg:#070b12; --panel:#101827; --line:#243047; --text:#f7fbff; --muted:#9da8b8; --accent:#ef8239; --danger:#ff5f57; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--text); font-family: Arial, Helvetica, sans-serif; }
    a { color: var(--accent); }
    .wrap { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 56px; }
    .top { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
    .panel { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 20px; }
    .grid { display: grid; grid-template-columns: minmax(0, 1fr) 420px; gap: 20px; align-items: start; }
    label { display: block; margin: 14px 0 6px; color: var(--muted); font-size: 13px; }
    input, textarea, select { width: 100%; border: 1px solid var(--line); border-radius: 6px; background: #070b12; color: var(--text); padding: 10px 12px; font: inherit; }
    textarea { min-height: 92px; resize: vertical; }
    button, .button { display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 6px; background: var(--accent); color: #130904; padding: 10px 14px; font-weight: 700; cursor: pointer; text-decoration: none; }
    .button.secondary, button.secondary { background: transparent; color: var(--text); border: 1px solid var(--line); }
    button.danger { background: var(--danger); color: #160303; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border-bottom: 1px solid var(--line); padding: 12px 8px; text-align: left; vertical-align: middle; }
    th { color: var(--muted); font-size: 12px; text-transform: uppercase; }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .notice { border: 1px solid var(--line); border-radius: 6px; padding: 12px; margin-bottom: 16px; color: var(--muted); }
    .error { border-color: var(--danger); color: #ffd5d2; }
    .help { color: var(--muted); font-size: 12px; line-height: 1.5; }
    .side-stack { position: sticky; top: 20px; display: grid; gap: 20px; max-height: calc(100vh - 40px); overflow-y: auto; }
    .preview-shell { position: static; }
    .preview-card { overflow: hidden; border: 1px solid var(--line); border-radius: 8px; background: #0b1120; }
    .preview-card.design-card-visual .preview-image img { height: 260px; }
    .preview-card.design-card-technical { border-left: 4px solid var(--accent); }
    .preview-card.design-card-compact .preview-image img { height: 180px; }
    .preview-card.design-accent-orange { --accent:#ef8239; }
    .preview-card.design-accent-violet { --accent:#aaa6f6; }
    .preview-card.design-accent-blue { --accent:#38bdf8; }
    .preview-card.design-accent-green { --accent:#33d17a; }
    .preview-image { display: grid; min-height: 180px; place-items: center; background: linear-gradient(135deg, #0b1120, #1c2540); color: var(--muted); font-size: 13px; }
    .preview-image img { display: none; width: 100%; height: 220px; object-fit: cover; }
    .preview-gallery { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 12px; }
    .preview-gallery img { width: 100%; aspect-ratio: 4 / 3; border: 1px solid var(--line); border-radius: 6px; object-fit: cover; }
    .preview-body { padding: 16px; }
    .preview-status { display: inline-flex; border: 1px solid var(--line); border-radius: 999px; padding: 4px 8px; color: var(--muted); font-size: 11px; font-weight: 700; }
    .preview-title { margin: 12px 0 6px; font-size: 22px; line-height: 1.1; }
    .preview-text { color: var(--muted); font-size: 13px; line-height: 1.55; }
    .preview-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
    .preview-tags span { border: 1px solid var(--line); border-radius: 999px; padding: 4px 8px; color: var(--text); font-size: 11px; }
    .preview-detail { margin-top: 14px; border-top: 1px solid var(--line); padding-top: 14px; }
    .preview-link { display: block; margin-top: 10px; overflow: hidden; color: var(--accent); text-overflow: ellipsis; white-space: nowrap; }
    .preview-points { margin: 10px 0 0; padding-left: 18px; color: var(--muted); font-size: 13px; line-height: 1.55; }
    .resource-board { display: grid; gap: 8px; }
    .resource-row { display: grid; grid-template-columns: 88px minmax(220px, 1fr) 190px 430px; gap: 12px; align-items: center; border: 1px solid var(--line); border-radius: 8px; background: var(--panel); padding: 10px 12px; }
    .resource-row:hover { border-color: #35425d; background: #121c2d; }
    .resource-thumb { position: relative; width: 88px; height: 64px; overflow: hidden; border: 1px solid var(--line); border-radius: 6px; background: #070b12; }
    .resource-thumb img { position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; }
    .resource-thumb-empty { position: absolute; inset: 0; display: grid; place-items: center; padding: 6px; color: var(--muted); font-size: 10px; text-align: center; }
    .resource-main { min-width: 0; }
    .resource-title { margin: 0; overflow: hidden; font-size: 16px; line-height: 1.15; text-overflow: ellipsis; white-space: nowrap; }
    .resource-subtitle { margin: 5px 0 0; overflow: hidden; color: #c8d7ea; font-size: 12px; font-weight: 700; line-height: 1.35; text-overflow: ellipsis; white-space: nowrap; }
    .resource-summary { display: -webkit-box; margin: 4px 0 0; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 1; color: var(--muted); font-size: 12px; line-height: 1.35; }
    .resource-tags { margin-top: 7px; gap: 4px; }
    .resource-tags span { padding: 2px 7px; font-size: 10px; }
    .resource-meta { min-width: 0; color: var(--muted); font-size: 11px; line-height: 1.55; }
    .resource-meta span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .status-pill { display: inline-flex; border: 1px solid var(--line); border-radius: 999px; padding: 4px 8px; color: var(--muted); font-size: 11px; font-weight: 700; }
    .status-toggle { color: #04110a; }
    .status-toggle.published { background: #33d17a; }
    .status-toggle.hidden { background: #f59e0b; color: #180b02; }
    .featured-pill { border-color: rgba(56,189,248,0.45); background: rgba(56,189,248,0.12); color: #9bdffc; }
    .featured-toggle.selected { background: #38bdf8; color: #03131b; }
    .resource-actions { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; align-items: center; }
    .resource-actions form, .resource-actions a, .resource-actions button { width: 100%; }
    .resource-actions button, .resource-actions .button { min-height: 32px; padding: 7px 8px; font-size: 12px; }
    .design-tools { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 10px; }
    .design-tool { border: 1px solid var(--line); border-radius: 8px; background: #0b1120; padding: 12px; }
    .design-tool label { margin-top: 0; }
    .design-hint { margin: 7px 0 0; color: var(--muted); font-size: 11px; line-height: 1.45; }
    .editorial-choice { margin-top: 14px; border: 1px solid rgba(56,189,248,0.28); border-radius: 8px; background: rgba(56,189,248,0.06); padding: 13px; }
    .editorial-checkbox { display: flex; align-items: flex-start; gap: 10px; margin: 0; color: var(--text); font-weight: 700; line-height: 1.4; }
    .editorial-checkbox input { width: auto; margin: 3px 0 0; accent-color: #38bdf8; }
    .toast { position: fixed; right: 24px; bottom: 24px; z-index: 20; transform: translateY(12px); border: 1px solid rgba(51,209,122,0.5); border-radius: 8px; background: #0f5132; color: #d1f7df; padding: 12px 16px; font-weight: 700; opacity: 0; pointer-events: none; transition: opacity 180ms ease, transform 180ms ease; }
    .toast.visible { transform: translateY(0); opacity: 1; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } .top { align-items: flex-start; flex-direction: column; } .side-stack { position: static; max-height: none; overflow: visible; } }
    @media (max-width: 1100px) { .resource-row { grid-template-columns: 88px minmax(0, 1fr) 190px; } .resource-actions { grid-column: 2 / -1; grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (max-width: 760px) { .resource-row { grid-template-columns: 72px minmax(0, 1fr); align-items: start; } .resource-thumb { width: 72px; height: 54px; } .resource-meta, .resource-actions { grid-column: 1 / -1; } .resource-actions { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 700px) { .design-tools { grid-template-columns: 1fr; } }
    @media (max-width: 520px) { .resource-row { grid-template-columns: 1fr; } .resource-thumb { width: 100%; height: 120px; } .resource-actions { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main class="wrap">
    <?php if ($isLogin): ?>
      <section class="panel" style="max-width:420px;margin:8vh auto;">
        <h1>Acceso de Marketing</h1>
        <?php if ($error): ?><div class="notice error"><?= h($error) ?></div><?php endif; ?>
        <form method="post">
          <input type="hidden" name="action" value="login">
          <label>Usuario</label>
          <input type="text" name="email" required autocomplete="username">
          <label>Contraseña</label>
          <input type="password" name="password" required autocomplete="current-password">
          <div style="margin-top:18px;"><button type="submit">Ingresar</button></div>
        </form>
      </section>
    <?php else: require_login(); ?>
      <div class="top">
        <div>
          <h1>Casos de éxito</h1>
          <p class="help">Crear, editar, publicar y copiar enlaces para LinkedIn.</p>
        </div>
        <div class="actions">
          <a class="button secondary" href="/admin/">Nuevo recurso</a>
          <a class="button secondary" href="/admin/?view=resources">Ver recursos</a>
          <a class="button secondary" href="/recursos/" target="_blank" rel="noreferrer">Página pública</a>
          <a class="button secondary" href="/admin/?action=logout">Salir</a>
        </div>
      </div>

      <?php if ($error): ?><div class="notice error"><?= h($error) ?></div><?php endif; ?>
      <?php if (isset($_GET['saved'])): ?><div class="notice">Caso guardado.</div><?php endif; ?>
      <?php if (isset($_GET['deleted'])): ?><div class="notice">Caso eliminado.</div><?php endif; ?>
      <?php if (isset($_GET['updated'])): ?><div class="notice">Estado actualizado.</div><?php endif; ?>
      <?php if (isset($_GET['featured_updated'])): ?><div class="notice">Selección editorial actualizada.</div><?php endif; ?>

      <?php if ($view === 'resources'): ?>
        <div class="notice">
          Casos visibles al final de cada página:
          <strong>Energía <?= h((string)$featuredCounts['Energía']) ?>/3</strong> ·
          <strong>Tecnología <?= h((string)$featuredCounts['Tecnología']) ?>/3</strong>.
          La apariencia en estas secciones siempre es clásica y no usa el diseño de Recursos.
        </div>
        <section class="resource-board">
          <?php if (count($cases) === 0): ?>
            <div class="panel">
              <h2>No hay recursos cargados</h2>
              <p class="help">Creá el primer caso desde “Nuevo recurso”.</p>
            </div>
          <?php endif; ?>

          <?php foreach ($cases as $case): ?>
            <?php
              $publicUrl = $baseUrl . '/recursos/?id=' . rawurlencode($case['slug']);
              $tags = lynx_decode_json_field($case['tags']);
              $detailLines = details_to_lines($case['details']);
              $caseDesign = lynx_case_design_from_row($case);
              $nextStatus = $case['status'] === 'published' ? 'draft' : 'published';
              $statusLabel = $case['status'] === 'published' ? 'Publicado' : 'Ocultado';
              $statusClass = $case['status'] === 'published' ? 'published' : 'hidden';
            ?>
            <article class="resource-row">
              <div class="resource-thumb">
                <span class="resource-thumb-empty">Sin imagen</span>
                <?php if ($case['image']): ?>
                  <img src="<?= h($case['image']) ?>" alt="" onerror="this.hidden=true">
                <?php endif; ?>
              </div>
              <div class="resource-main">
                <h2 class="resource-title"><?= h($case['title']) ?></h2>
                <p class="resource-subtitle"><?= h($case['subtitle']) ?></p>
                <p class="resource-summary"><?= h($case['summary']) ?></p>
                <div class="preview-tags resource-tags">
                  <?php foreach ($tags as $tag): ?>
                    <span><?= h((string)$tag) ?></span>
                  <?php endforeach; ?>
                </div>
              </div>
              <div class="resource-meta">
                <span>Categoría: <?= h($case['category']) ?></span>
                <span>Slug: <?= h($case['slug']) ?></span>
                <span>Diseño: <?= h($caseDesign['card']) ?> / <?= h($caseDesign['accent']) ?></span>
                <?php if ((int)$case['featured'] === 1): ?>
                  <span class="status-pill featured-pill">Visible en <?= h($case['category']) ?></span>
                <?php else: ?>
                  <span>No seleccionado para sección</span>
                <?php endif; ?>
                <span>Actualizado: <?= h($case['updated_at']) ?></span>
                <a class="preview-link" href="<?= h($publicUrl) ?>" target="_blank" rel="noreferrer">Abrir recurso</a>
              </div>
              <div class="resource-actions">
                <a class="button secondary" href="/admin/?edit=<?= h((string)$case['id']) ?>">Modificar</a>
                <form method="post">
                  <input type="hidden" name="action" value="toggle_status">
                  <input type="hidden" name="id" value="<?= h((string)$case['id']) ?>">
                  <input type="hidden" name="status" value="<?= h($nextStatus) ?>">
                  <button class="status-toggle <?= h($statusClass) ?>" type="submit"><?= h($statusLabel) ?></button>
                </form>
                <form method="post">
                  <input type="hidden" name="action" value="toggle_featured">
                  <input type="hidden" name="id" value="<?= h((string)$case['id']) ?>">
                  <input type="hidden" name="featured" value="<?= (int)$case['featured'] === 1 ? '0' : '1' ?>">
                  <button class="featured-toggle <?= (int)$case['featured'] === 1 ? 'selected' : 'secondary' ?>" type="submit">
                    <?= (int)$case['featured'] === 1 ? 'En sección' : 'Mostrar' ?>
                  </button>
                </form>
                <button class="secondary" type="button" data-copy-url="<?= h($publicUrl) ?>">Copiar link</button>
                <form method="post" onsubmit="return confirm('¿Eliminar este caso?');">
                  <input type="hidden" name="action" value="delete">
                  <input type="hidden" name="id" value="<?= h((string)$case['id']) ?>">
                  <input type="hidden" name="return_view" value="resources">
                  <button class="danger" type="submit">Borrar</button>
                </form>
              </div>
            </article>
          <?php endforeach; ?>
        </section>
      <?php else: ?>
      <div class="grid">
        <section class="panel">
          <h2><?= $editing ? 'Editar caso' : 'Nuevo caso' ?></h2>
          <?php
            $row = $editing ?: [
                'id' => 0, 'slug' => '', 'title' => '', 'subtitle' => '', 'summary' => '',
                'description' => '', 'category' => 'Energía', 'tags' => '[]', 'image' => '',
                'gallery' => '[]', 'details' => '[]', 'design' => '[]', 'featured' => 0, 'status' => 'draft',
            ];
            $tags = implode("\n", lynx_decode_json_field($row['tags']));
            $detailItems = details_to_lines($row['details']);
            $design = lynx_case_design_from_row($row);
          ?>
          <form method="post" enctype="multipart/form-data" data-resource-form>
            <input type="hidden" name="action" value="save">
            <input type="hidden" name="id" value="<?= h((string)$row['id']) ?>">
            <input type="hidden" name="existing_image" value="<?= h($row['image']) ?>">
            <input type="hidden" name="existing_gallery" value="<?= h(json_encode(lynx_decode_json_field($row['gallery']), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) ?>">

            <label>Título</label>
            <input name="title" value="<?= h($row['title']) ?>" required>

            <label>Slug</label>
            <input name="slug" value="<?= h($row['slug']) ?>" placeholder="Se genera desde el título si queda vacío">

            <label>Subtítulo</label>
            <input name="subtitle" value="<?= h($row['subtitle']) ?>">

            <label>Categoría</label>
            <select name="category">
              <option value="Energía" <?= $row['category'] === 'Energía' ? 'selected' : '' ?>>Energía</option>
              <option value="Tecnología" <?= $row['category'] === 'Tecnología' ? 'selected' : '' ?>>Tecnología</option>
            </select>

            <div class="editorial-choice">
              <label class="editorial-checkbox">
                <input type="checkbox" name="featured" value="1" <?= (int)($row['featured'] ?? 0) === 1 ? 'checked' : '' ?>>
                <span>Mostrar este caso al final de la página de <span data-featured-category><?= h($row['category']) ?></span></span>
              </label>
              <p class="design-hint">Máximo 3 casos publicados por categoría. Se mostrará con la tarjeta clásica fija, independientemente del diseño elegido para Recursos.</p>
            </div>

            <label>Resumen</label>
            <textarea name="summary"><?= h($row['summary']) ?></textarea>

            <label>Descripción</label>
            <textarea name="description" style="min-height:150px;"><?= h($row['description']) ?></textarea>

            <label>Etiquetas, una por línea</label>
            <textarea name="tags"><?= h($tags) ?></textarea>

            <label>Imagen principal</label>
            <input type="file" name="image_file" accept="image/*">
            <?php if ($row['image']): ?><p class="help">Actual: <?= h($row['image']) ?></p><?php endif; ?>

            <label>Imágenes adicionales (opcional)</label>
            <input type="file" name="gallery_files[]" accept="image/*" multiple>
            <?php
              $currentGalleryCount = max(0, count(lynx_decode_json_field($row['gallery'])) - ($row['image'] ? 1 : 0));
            ?>
            <?php if ($currentGalleryCount > 0): ?><p class="help">Este recurso ya tiene <?= h((string)$currentGalleryCount) ?> imágenes adicionales.</p><?php endif; ?>

            <label>Puntos destacados, uno por línea</label>
            <textarea name="detail_items" style="min-height:120px;"><?= h($detailItems) ?></textarea>
            <p class="help">Ejemplo: alcance del proyecto, solución implementada, resultado obtenido.</p>

            <label>Estado</label>
            <select name="status">
              <option value="draft" <?= $row['status'] === 'draft' ? 'selected' : '' ?>>Borrador</option>
              <option value="published" <?= $row['status'] === 'published' ? 'selected' : '' ?>>Publicado</option>
            </select>

            <div class="design-tools">
              <div class="design-tool">
                <label>Plantilla visual</label>
                <select name="design_card">
                  <option value="compact" <?= $design['card'] === 'compact' ? 'selected' : '' ?>>Compacta</option>
                  <option value="visual" <?= $design['card'] === 'visual' ? 'selected' : '' ?>>Visual</option>
                  <option value="technical" <?= $design['card'] === 'technical' ? 'selected' : '' ?>>Técnica</option>
                </select>
                <p class="design-hint">Define el tamaño y la presencia de la tarjeta pública.</p>
              </div>
              <div class="design-tool">
                <label>Color de acento</label>
                <select name="design_accent">
                  <option value="orange" <?= $design['accent'] === 'orange' ? 'selected' : '' ?>>Naranja Lynx</option>
                  <option value="violet" <?= $design['accent'] === 'violet' ? 'selected' : '' ?>>Violeta</option>
                  <option value="blue" <?= $design['accent'] === 'blue' ? 'selected' : '' ?>>Azul</option>
                  <option value="green" <?= $design['accent'] === 'green' ? 'selected' : '' ?>>Verde</option>
                </select>
                <p class="design-hint">Afecta bordes, etiquetas y llamados a la acción.</p>
              </div>
              <div class="design-tool">
                <label>Tratamiento de imagen</label>
                <select name="design_image">
                  <option value="cover" <?= $design['image'] === 'cover' ? 'selected' : '' ?>>Recortar para portada</option>
                  <option value="contain" <?= $design['image'] === 'contain' ? 'selected' : '' ?>>Mostrar imagen completa</option>
                </select>
                <p class="design-hint">Úsalo para logos, renders o placas con texto.</p>
              </div>
              <div class="design-tool">
                <label>Detalle interno</label>
                <select name="design_detail">
                  <option value="cards" <?= $design['detail'] === 'cards' ? 'selected' : '' ?>>Bloques destacados</option>
                  <option value="list" <?= $design['detail'] === 'list' ? 'selected' : '' ?>>Lista técnica</option>
                </select>
                <p class="design-hint">Controla cómo se ven los puntos destacados en el modal.</p>
              </div>
            </div>

            <div class="actions" style="margin-top:18px;">
              <button type="submit">Guardar</button>
              <?php if ($editing): ?><a class="button secondary" href="/admin/">Nuevo caso</a><?php endif; ?>
            </div>
          </form>
        </section>

        <aside class="side-stack">
          <section class="panel preview-shell" aria-live="polite">
            <h2>Vista previa</h2>
            <p class="help">Se actualiza antes de guardar el recurso.</p>
            <div class="preview-card" data-preview-card>
              <div class="preview-image">
                <img alt="" data-preview-image>
                <span data-preview-image-placeholder>Imagen principal</span>
              </div>
              <div class="preview-gallery" data-preview-gallery></div>
              <div class="preview-body">
                <span class="preview-status" data-preview-status>Borrador</span>
                <h3 class="preview-title" data-preview-title>Título del caso</h3>
                <p class="preview-text" data-preview-summary>Resumen del recurso.</p>
                <div class="preview-tags" data-preview-tags></div>
                <div class="preview-detail">
                  <p class="preview-text" data-preview-subtitle>Subtítulo del caso.</p>
                  <p class="preview-text" data-preview-description>Descripción del caso.</p>
                  <ul class="preview-points" data-preview-points></ul>
                  <a class="preview-link" data-preview-link href="/recursos/" target="_blank" rel="noreferrer">/recursos/</a>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
      <?php endif; ?>
    <?php endif; ?>
    <div class="toast" data-toast>Copiado</div>
  </main>
  <script>
    (() => {
      const toast = document.querySelector("[data-toast]");
      let toastTimer = 0;

      const showCopied = () => {
        if (!toast) return;
        window.clearTimeout(toastTimer);
        toast.classList.add("visible");
        toastTimer = window.setTimeout(() => {
          toast.classList.remove("visible");
        }, 1600);
      };

      document.querySelectorAll("[data-copy-url]").forEach((button) => {
        button.addEventListener("click", async () => {
          const url = button.getAttribute("data-copy-url") || "";
          if (!url) return;

          try {
            await navigator.clipboard.writeText(url);
          } catch {
            const input = document.createElement("input");
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            input.remove();
          }

          showCopied();
        });
      });

      const form = document.querySelector("[data-resource-form]");
      if (!form) return;

      const baseUrl = <?= json_encode($baseUrl, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;
      const fields = {
        title: form.elements.namedItem("title"),
        slug: form.elements.namedItem("slug"),
        subtitle: form.elements.namedItem("subtitle"),
        summary: form.elements.namedItem("summary"),
        description: form.elements.namedItem("description"),
        category: form.elements.namedItem("category"),
        tags: form.elements.namedItem("tags"),
        detailItems: form.elements.namedItem("detail_items"),
        status: form.elements.namedItem("status"),
        imageFile: form.elements.namedItem("image_file"),
        galleryFiles: form.elements.namedItem("gallery_files[]"),
        existingImage: form.elements.namedItem("existing_image"),
        existingGallery: form.elements.namedItem("existing_gallery"),
        designCard: form.elements.namedItem("design_card"),
        designAccent: form.elements.namedItem("design_accent"),
        designImage: form.elements.namedItem("design_image"),
        designDetail: form.elements.namedItem("design_detail"),
      };
      const preview = {
        card: document.querySelector("[data-preview-card]"),
        image: document.querySelector("[data-preview-image]"),
        imagePlaceholder: document.querySelector("[data-preview-image-placeholder]"),
        gallery: document.querySelector("[data-preview-gallery]"),
        status: document.querySelector("[data-preview-status]"),
        title: document.querySelector("[data-preview-title]"),
        subtitle: document.querySelector("[data-preview-subtitle]"),
        summary: document.querySelector("[data-preview-summary]"),
        description: document.querySelector("[data-preview-description]"),
        tags: document.querySelector("[data-preview-tags]"),
        points: document.querySelector("[data-preview-points]"),
        link: document.querySelector("[data-preview-link]"),
      };
      const featuredCategory = document.querySelector("[data-featured-category]");

      let objectUrl = "";
      let lastImageFile = null;
      let lastExistingImage = null;
      let galleryObjectUrls = [];

      const slugify = (value) =>
        value
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "caso";

      const text = (field, fallback) => {
        const value = field && "value" in field ? field.value.trim() : "";
        return value || fallback;
      };

      const updateImage = () => {
        const files = fields.imageFile?.files;
        const selectedFile = files && files.length > 0 ? files[0] : null;
        const existing = text(fields.existingImage, "");

        if (selectedFile) {
          if (selectedFile === lastImageFile) return;
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          lastImageFile = selectedFile;
          lastExistingImage = null;
          objectUrl = URL.createObjectURL(selectedFile);
          preview.image.src = objectUrl;
          preview.image.style.display = "block";
          preview.imagePlaceholder.style.display = "none";
          return;
        }

        if (existing) {
          if (existing === lastExistingImage) return;
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          objectUrl = "";
          lastImageFile = null;
          lastExistingImage = existing;
          preview.image.src = existing;
          preview.image.style.display = "block";
          preview.imagePlaceholder.style.display = "none";
          return;
        }

        if (objectUrl) URL.revokeObjectURL(objectUrl);
        objectUrl = "";
        lastImageFile = null;
        lastExistingImage = null;
        preview.image.removeAttribute("src");
        preview.image.style.display = "none";
        preview.imagePlaceholder.style.display = "block";
      };

      const clearGalleryObjectUrls = () => {
        galleryObjectUrls.forEach((url) => URL.revokeObjectURL(url));
        galleryObjectUrls = [];
      };

      const updateGallery = () => {
        if (!preview.gallery) return;

        clearGalleryObjectUrls();
        const selectedFiles = Array.from(fields.galleryFiles?.files || []);
        const existingGallery = (() => {
          try {
            const decoded = JSON.parse(fields.existingGallery?.value || "[]");
            return Array.isArray(decoded) ? decoded.filter(Boolean) : [];
          } catch {
            return [];
          }
        })();
        const existingMain = text(fields.existingImage, "");
        const existingExtras = existingGallery.filter((url) => url && url !== existingMain);
        const items = [
          ...existingExtras.map((url) => ({ url })),
          ...selectedFiles.map((file) => {
            const url = URL.createObjectURL(file);
            galleryObjectUrls.push(url);
            return { url };
          }),
        ].slice(0, 6);

        preview.gallery.replaceChildren(
          ...items.map((item) => {
            const image = document.createElement("img");
            image.src = item.url;
            image.alt = "";
            return image;
          }),
        );
      };

      const updatePreview = () => {
        const title = text(fields.title, "Título del caso");
        const slug = slugify(text(fields.slug, title));
        const status = fields.status?.value === "published" ? "Publicado" : "Borrador";
        const tags = text(fields.tags, "")
          .split(/\r?\n/)
          .map((tag) => tag.trim())
          .filter(Boolean);
        const points = text(fields.detailItems, "")
          .split(/\r?\n/)
          .map((point) => point.trim())
          .filter(Boolean);
        const publicUrl = `${baseUrl}/recursos/?id=${encodeURIComponent(slug)}`;
        const designCard = text(fields.designCard, "compact");
        const designAccent = text(fields.designAccent, "orange");
        const designImage = text(fields.designImage, "cover");

        preview.card.className = `preview-card design-card-${designCard} design-accent-${designAccent}`;
        preview.image.style.objectFit = designImage === "contain" ? "contain" : "cover";
        preview.image.style.background = designImage === "contain" ? "#070b12" : "";
        preview.status.textContent = status;
        if (featuredCategory) {
          featuredCategory.textContent = text(fields.category, "Energía");
        }
        preview.title.textContent = title;
        preview.subtitle.textContent = text(fields.subtitle, "Subtítulo del caso.");
        preview.summary.textContent = text(fields.summary, "Resumen del recurso.");
        preview.description.textContent = text(fields.description, "Descripción del caso.");
        preview.link.href = publicUrl;
        preview.link.textContent = publicUrl;
        preview.tags.replaceChildren(
          ...(tags.length ? tags : ["Tag"])
            .slice(0, 6)
            .map((tag) => {
              const item = document.createElement("span");
              item.textContent = tag;
              return item;
            }),
        );
        preview.points.replaceChildren(
          ...points.slice(0, 6).map((point) => {
            const item = document.createElement("li");
            item.textContent = point;
            return item;
          }),
        );
        updateImage();
        updateGallery();
      };

      form.addEventListener("input", updatePreview);
      form.addEventListener("change", updatePreview);
      updatePreview();
    })();
  </script>
</body>
</html>
