# Prueba local del CMS de recursos

Este proyecto puede probar el admin de recursos localmente con XAMPP.

## Requisitos

- XAMPP instalado en `C:\xampp`.
- Node/npm instalados.

En esta maquina ya se detecto:

- PHP: `C:\xampp\php\php.exe`
- MariaDB/MySQL client: `C:\xampp\mysql\bin\mysql.exe`

## Primera vez

Desde la carpeta del proyecto:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\local-cms.ps1 setup
```

Esto hace:

- Levanta MariaDB de XAMPP en `127.0.0.1:3307`.
- Ejecuta `npm run build`.
- Crea la base `lynx_local`.
- Carga `public/api/schema.sql`.
- Crea un usuario admin local.
- Inserta un caso demo publicado.
- Genera `out/api/config.php`.

Credenciales locales:

```text
Email: marketing@lynx.local
Contraseña: LINX2026
```

## Correr el sitio local

```powershell
powershell -ExecutionPolicy Bypass -File scripts\local-cms.ps1 start
```

Abrir:

- Sitio publico: http://127.0.0.1:8088/recursos/
- Admin: http://127.0.0.1:8088/admin/?login=1

Para detener el sitio, usar `Ctrl+C` en la terminal.

## Detener MariaDB local

```powershell
powershell -ExecutionPolicy Bypass -File scripts\local-cms.ps1 stop-db
```

## Detener el servidor local

Si lo arrancaste con el script en una terminal, alcanza con `Ctrl+C`.

Si quedo corriendo en segundo plano:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\local-cms.ps1 stop-web
```

Para apagar servidor web y MariaDB local juntos:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\local-cms.ps1 stop-all
```

## Que probar

- Entrar al admin con las credenciales locales.
- Crear un caso nuevo como `Publicado`.
- Subir una imagen principal.
- Ver el caso en `/recursos/`.
- Abrir el modal del caso.
- Usar `Copiar link`.
- Editar el caso y refrescar `/recursos/`.
- Pasarlo a `Borrador` y confirmar que desaparece de la vista publica.

## Nota

El archivo `out/api/config.php` es local y se regenera con el script. No se sube a git ni se usa para BlueHost.
