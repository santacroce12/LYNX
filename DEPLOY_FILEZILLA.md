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

## Recursos dinámicos: administración y base de datos

La sección `/recursos` puede cargar casos publicados desde PHP/MySQL. Si la API no está configurada o falla, la página conserva los casos incluidos en el build como respaldo.

### Configurar MySQL en BlueHost

1. Crear una base de datos MySQL y un usuario con permisos sobre esa base.
2. Ejecutar el archivo `out/api/schema.sql` desde phpMyAdmin usando UTF-8 (`utf8mb4`).
3. El SQL deja creada la cuenta de administración:

```text
Usuario: admin
Contraseña: LynxAdmin2026
Rol: admin
```

Si la base ya existe, al abrir `/admin/` se ejecuta una migración única que crea o actualiza esta cuenta sin borrar los casos cargados.

### Configurar credenciales PHP

1. Conservar el archivo `/public_html/api/config.php` que ya utiliza BlueHost. Si todavía no existe, copiar `out/api/config.example.php` como `config.php`.
2. Completar `db_host`, `db_name`, `db_user`, `db_pass` y `base_url`.
3. Subir `config.php` manualmente a `/public_html/api/config.php`.
4. Crear o verificar permisos de escritura para `/public_html/uploads/cases/`.

`config.php` no se incluye en `out/` porque contiene credenciales privadas y no debe reemplazarse con la configuración local de XAMPP.

### Publicar

Después de `npm run build`, subir el contenido de `out/` a `/public_html/`. El build incluye:

- `/admin/` para el panel de marketing.
- `/api/` para endpoints públicos y el SQL de instalación.
- `/recursos/` actualizado para consumir `/api/cases.php`.
- `/uploads/cases/` con protección para impedir la ejecución de scripts subidos.

No sobrescribir `api/config.php` en el servidor.
