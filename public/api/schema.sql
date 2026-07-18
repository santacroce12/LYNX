SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') NOT NULL DEFAULT 'editor',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lynx_migrations (
  migration_key VARCHAR(190) NOT NULL PRIMARY KEY,
  applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS success_cases (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(190) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  description MEDIUMTEXT NOT NULL,
  category ENUM('Energía', 'Tecnología') NOT NULL DEFAULT 'Energía',
  tags LONGTEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  gallery LONGTEXT NOT NULL,
  details LONGTEXT NOT NULL,
  design LONGTEXT NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_success_cases_status_updated (status, updated_at),
  INDEX idx_success_cases_featured_category (featured, category, status, updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO admin_users (email, password_hash, role)
VALUES ('admin', '$2y$10$mg7mEqOs7hSCMSnd0FTI5.v9mLu.UoegyWkdKRKmTJVG9vI2oLRUq', 'admin')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role = 'admin';

INSERT IGNORE INTO lynx_migrations (migration_key)
VALUES ('2026-07-default-admin-lynxadmin2026');
