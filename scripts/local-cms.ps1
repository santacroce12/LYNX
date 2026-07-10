param(
  [ValidateSet("setup", "start", "stop-web", "stop-db", "stop-all")]
  [string]$Action = "start",
  [int]$DbPort = 3307,
  [int]$WebPort = 8088,
  [string]$AdminEmail = "marketing@lynx.local",
  [string]$AdminPassword = "LynxLocal2026!"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$Php = "C:\xampp\php\php.exe"
$Mysql = "C:\xampp\mysql\bin\mysql.exe"
$Mysqld = "C:\xampp\mysql\bin\mysqld.exe"
$MysqlIni = "C:\xampp\mysql\bin\my.ini"
$PidFile = Join-Path $env:TEMP "lynx-local-mariadb-$DbPort.pid"

function Assert-Xampp {
  foreach ($path in @($Php, $Mysql, $Mysqld, $MysqlIni)) {
    if (-not (Test-Path -LiteralPath $path)) {
      throw "No encuentro XAMPP en C:\xampp. Instalalo desde https://www.apachefriends.org/es/index.html o ajusta la ruta en scripts/local-cms.ps1."
    }
  }
}

function Test-PortOpen {
  param([int]$Port)

  $client = [System.Net.Sockets.TcpClient]::new()
  try {
    $result = $client.BeginConnect("127.0.0.1", $Port, $null, $null)
    if (-not $result.AsyncWaitHandle.WaitOne(400, $false)) {
      return $false
    }
    $client.EndConnect($result)
    return $true
  } catch {
    return $false
  } finally {
    $client.Close()
  }
}

function Start-LocalDb {
  if (Test-PortOpen -Port $DbPort) {
    Write-Host "MariaDB local ya esta escuchando en 127.0.0.1:$DbPort"
    return
  }

  $args = @(
    "--defaults-file=$MysqlIni",
    "--port=$DbPort",
    "--socket=C:/xampp/mysql/mysql$DbPort.sock"
  )

  $process = Start-Process -FilePath $Mysqld -ArgumentList $args -WindowStyle Hidden -PassThru
  Set-Content -LiteralPath $PidFile -Value $process.Id -Encoding ASCII

  for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Milliseconds 500
    if (Test-PortOpen -Port $DbPort) {
      Write-Host "MariaDB local iniciado en 127.0.0.1:$DbPort"
      return
    }
  }

  throw "No pude iniciar MariaDB local en el puerto $DbPort. Revisar C:\xampp\mysql\data\mysql_error.log."
}

function Stop-LocalDb {
  if (Test-Path -LiteralPath $PidFile) {
    $pidValue = Get-Content -LiteralPath $PidFile -Raw
    if ($pidValue -match '^\d+$') {
      Stop-Process -Id ([int]$pidValue) -ErrorAction SilentlyContinue
    }
    Remove-Item -LiteralPath $PidFile -Force -ErrorAction SilentlyContinue
    Write-Host "MariaDB local detenido."
  } else {
    Write-Host "No encontre PID local. Si MariaDB sigue activo, cerralo desde el Administrador de tareas o XAMPP Control Panel."
  }
}

function Stop-Web {
  $escapedRoot = [regex]::Escape((Join-Path $ProjectRoot "out"))
  $processes = Get-CimInstance Win32_Process -Filter "name = 'php.exe'" |
    Where-Object {
      $_.CommandLine -match "-S\s+127\.0\.0\.1:$WebPort" -and
      ($_.CommandLine -match $escapedRoot -or $_.CommandLine -match "-t\s+`"?out`"?")
    }

  if (-not $processes) {
    Write-Host "No encontre servidor PHP local en 127.0.0.1:$WebPort."
    return
  }

  foreach ($process in $processes) {
    Stop-Process -Id $process.ProcessId -Force -ErrorAction SilentlyContinue
    Write-Host "Servidor PHP local detenido. PID: $($process.ProcessId)"
  }
}

function Invoke-MysqlFile {
  param([string]$Sql)

  $tmp = Join-Path $env:TEMP "lynx-local-$([guid]::NewGuid()).sql"
  Set-Content -LiteralPath $tmp -Value $Sql -Encoding UTF8
  try {
    cmd /c "`"$Mysql`" --host=127.0.0.1 --port=$DbPort --user=root --default-character-set=utf8mb4 < `"$tmp`""
    if ($LASTEXITCODE -ne 0) {
      throw "mysql.exe termino con codigo $LASTEXITCODE"
    }
  } finally {
    Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue
  }
}

function Initialize-LocalDb {
  $schemaPath = Join-Path $ProjectRoot "public\api\schema.sql"
  $schema = [System.IO.File]::ReadAllText($schemaPath, [System.Text.UTF8Encoding]::new($false))
  $energyCategory = "Energ$([char]0x00ED)a"
  $hash = & $Php -r "echo password_hash('$AdminPassword', PASSWORD_DEFAULT);"

  $sql = @"
CREATE DATABASE IF NOT EXISTS lynx_local CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SET NAMES utf8mb4;
USE lynx_local;
DROP TABLE IF EXISTS success_cases;
DROP TABLE IF EXISTS admin_users;
$schema
DELETE FROM admin_users WHERE email = '$AdminEmail';
INSERT INTO admin_users (email, password_hash, role) VALUES ('$AdminEmail', '$hash', 'admin');

INSERT INTO success_cases
  (slug, title, subtitle, summary, description, category, tags, image, gallery, details, design, featured, status)
VALUES
  (
    'caso-demo-local',
    'Caso demo local',
    'Recurso cargado desde PHP y MariaDB local',
    'Este caso viene desde la base local y sirve para probar que marketing puede publicar recursos sin tocar codigo.',
    'Contenido de prueba para validar el panel admin, la API publica y el modal de recursos. Podes editarlo, despublicarlo o borrarlo desde /admin/.',
    '$energyCategory',
    '["Demo","Marketing","LinkedIn"]',
    '/images/recursos/Nihuil.optimized.webp',
    '["/images/recursos/Nihuil.optimized.webp"]',
    '[{"title":"Prueba local","items":["Alta y edicion desde admin","Imagen principal y galeria","Link compartible para LinkedIn"]}]',
    '{"card":"compact","accent":"orange","image":"cover","detail":"cards"}',
    1,
    'published'
  )
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  subtitle = VALUES(subtitle),
  summary = VALUES(summary),
  description = VALUES(description),
  category = VALUES(category),
  tags = VALUES(tags),
  image = VALUES(image),
  gallery = VALUES(gallery),
  details = VALUES(details),
  design = VALUES(design),
  featured = VALUES(featured),
  status = VALUES(status);
"@

  Invoke-MysqlFile -Sql $sql
  Write-Host "Base lynx_local lista. Usuario admin: $AdminEmail / $AdminPassword"
}

function Ensure-Build {
  Push-Location $ProjectRoot
  try {
    if (-not (Test-Path -LiteralPath "out\recursos\index.html")) {
      npm run build
    }
  } finally {
    Pop-Location
  }
}

function Write-LocalConfig {
  $apiDir = Join-Path $ProjectRoot "out\api"
  $uploadsDir = Join-Path $ProjectRoot "out\uploads\cases"
  New-Item -ItemType Directory -Force -Path $apiDir, $uploadsDir | Out-Null

  $config = @"
<?php
return [
    'db_host' => '127.0.0.1;port=$DbPort',
    'db_name' => 'lynx_local',
    'db_user' => 'root',
    'db_pass' => '',
    'base_url' => 'http://127.0.0.1:$WebPort',
    'upload_dir' => __DIR__ . '/../uploads/cases',
    'upload_url' => '/uploads/cases',
];
"@

  Set-Content -LiteralPath (Join-Path $apiDir "config.php") -Value $config -Encoding UTF8
  Write-Host "Config local escrita en out\api\config.php"
}

function Start-Web {
  Push-Location $ProjectRoot
  try {
    Write-Host ""
    Write-Host "Sitio local:  http://127.0.0.1:$WebPort/recursos/"
    Write-Host "Admin local:  http://127.0.0.1:$WebPort/admin/?login=1"
    Write-Host "Usuario:      $AdminEmail"
    Write-Host "Password:     $AdminPassword"
    Write-Host ""
    Write-Host "Para detener el sitio: Ctrl+C"
    Write-Host ""
    & $Php -S "127.0.0.1:$WebPort" -t "out"
  } finally {
    Pop-Location
  }
}

Assert-Xampp

if ($Action -eq "stop-web") {
  Stop-Web
  exit
}

if ($Action -eq "stop-db") {
  Stop-LocalDb
  exit
}

if ($Action -eq "stop-all") {
  Stop-Web
  Stop-LocalDb
  exit
}

Start-LocalDb

if ($Action -eq "setup") {
  Push-Location $ProjectRoot
  try {
    npm run build
  } finally {
    Pop-Location
  }
  Initialize-LocalDb
  Write-LocalConfig
  Write-Host ""
  Write-Host "Setup listo. Ahora corre:"
  Write-Host "powershell -ExecutionPolicy Bypass -File scripts\local-cms.ps1 start"
  exit
}

Ensure-Build
Write-LocalConfig
Start-Web
