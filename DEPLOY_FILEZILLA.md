# Publicación por FileZilla

El sitio se exporta como archivos estáticos compatibles con un hosting que resuelve `index.html`.

## Generar la versión publicable

```powershell
npm install
npm run build
```

El resultado queda en la carpeta `out`. Hay que subir **el contenido de `out`**, no la carpeta `out`, directamente a `/public_html/`.

Las rutas se exportan con esta estructura:

```text
out/
  index.html
  energia/index.html
  tecnologia/index.html
  partners/index.html
  recursos/index.html
  contacto/index.html
  faqs/index.html
  firma/index.html
  _next/
  images/
```

## Limpieza segura de `/public_html/`

Antes de publicar, descargar una copia de respaldo del contenido actual.

- Conservar `.well-known`: puede contener verificaciones de dominio o certificados SSL.
- Conservar `20260511` como respaldo hasta comprobar que el sitio nuevo funciona.
- Reemplazar el `index.html` anterior.
- Eliminar la carpeta `images` anterior antes de subir la nueva para evitar archivos obsoletos.
- Conservar `lynx.cl` hasta confirmar desde el panel del hosting que no sea la raíz de otro dominio o subdominio. Si solo pertenece al sitio anterior y no está asociada a ningún dominio, se puede eliminar después de verificar la publicación.
- En publicaciones futuras, eliminar también las carpetas antiguas `_next`, `energia`, `tecnologia`, `partners`, `recursos`, `contacto`, `faqs` y `firma` antes de subir la exportación nueva.

En FileZilla, activar la visualización de archivos ocultos para no borrar accidentalmente `.well-known`.

## Recursos dinamicos: admin y base de datos

La seccion `/recursos` puede cargar casos publicados desde PHP/MySQL. Si la API no esta configurada o falla, la pagina conserva los casos incluidos en el build como fallback.

### Configurar MySQL en BlueHost

1. Crear una base de datos MySQL y un usuario con permisos sobre esa base.
2. Ejecutar el SQL de `public/api/schema.sql` desde phpMyAdmin.
3. Crear el primer usuario de marketing:

```bash
php -r "echo password_hash('CAMBIAR_PASSWORD', PASSWORD_DEFAULT), PHP_EOL;"
```

Luego insertar el email y el hash generado en `admin_users`.

### Configurar credenciales PHP

1. Copiar `public/api/config.example.php` como `public/api/config.php`.
2. Completar `db_host`, `db_name`, `db_user`, `db_pass` y `base_url`.
3. Subir `config.php` manualmente a `/public_html/api/config.php`.
4. Crear o verificar permisos de escritura para `/public_html/uploads/cases/`.

`config.php` no se versiona en git porque contiene credenciales.

### Publicar

Despues de `npm run build`, subir el contenido de `out/` a `/public_html/`. El build incluye:

- `/admin/` para el panel de marketing.
- `/api/` para endpoints publicos.
- `/recursos/` actualizado para consumir `/api/cases.php`.

No sobrescribir `api/config.php` en el servidor.
